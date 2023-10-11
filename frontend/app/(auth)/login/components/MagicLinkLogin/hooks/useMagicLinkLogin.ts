import { useState } from "react";

type UseMagicLinkLoginProps = {
  email: string;
  setEmail: (email: string) => void;
};

import { useSupabase } from "@/lib/context/SupabaseProvider";
import { useToast } from "@/lib/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMagicLinkLogin = ({
  email,
  setEmail,
}: UseMagicLinkLoginProps) => {
  const { supabase } = useSupabase();
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();

  // masao : 11-oct-23 : localization
  const handleMagicLinkLogin = async () => {
    if (email === "") {
      publish({
        variant: "danger",
        text: "貴方の電子メールアドレスを入力してください",
        // text: "Please enter your email address",
      });

      return;
    }

    setIsPending(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.hostname, // current domain name. for eg localhost:3000, localhost:3001, https://...
      },
    });

    // masao : 11-oct-23 : localization
    if (error) {
      publish({
        variant: "danger",
        text: error.message,
      });
    } else {
      publish({
        variant: "success",
        text: "電子メールが認識されればマジックリンクは正常に送信されました",
        // text: "Magic link sent successfully if email recognized",
      });

      setEmail("");
    }
    setIsPending(false);
  };

  return { handleMagicLinkLogin, isPending };
};
