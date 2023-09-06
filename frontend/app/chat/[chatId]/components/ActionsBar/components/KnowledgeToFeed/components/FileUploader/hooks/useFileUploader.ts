/* eslint-disable max-lines */

import { FileRejection, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import { useSupabase } from "@/lib/context/SupabaseProvider";
import { useToast } from "@/lib/hooks";
import { redirectToLogin } from "@/lib/router/redirectToLogin";

import { FeedItemType } from "../../../types";

type UseFileUploaderProps = {
  addContent: (content: FeedItemType) => void;
  files: File[];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFileUploader = ({
  addContent,
  files,
}: UseFileUploaderProps) => {
  const { publish } = useToast();
  const { session } = useSupabase();

  if (session === null) {
    redirectToLogin();
  }

  const { t } = useTranslation(["upload"]);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0];

      if (firstRejection.errors[0].code === "file-invalid-type") {
        const errorMessage = t("invalidFileType");
        publish({ variant: "danger", text: errorMessage });
      } else {
        publish({
          variant: "danger",
          text: t("maxSizeError", { ns: "upload" }),
        });
      }

      return;
    }

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const isAlreadyInFiles =
        files.filter((f) => f.name === file.name && f.size === file.size)
          .length > 0;
      if (isAlreadyInFiles) {
        publish({
          variant: "warning",
          text: t("alreadyAdded", { fileName: file.name, ns: "upload" }),
        });
        acceptedFiles.splice(i, 1);
      } else {
        addContent({
          source: "upload",
          file: file,
        });
      }
    }
  };

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    maxSize: 100000000, // 1 MB
    accept: {
      "text/plain": [".txt"],
      "text/csv": [".csv"],
      "text/markdown": [".md", ".markdown"],
      "audio/x-m4a": [".m4a"],
      "audio/mpeg": [".mp3", ".mpga", ".mpeg"],
      "audio/webm": [".webm"],
      "video/mp4": [".mp4"],
      "audio/wav": [".wav"],
      "application/pdf": [".pdf"],
      "text/html": [".html"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.oasis.opendocument.text": [".odt"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
        ".xls",
      ],
      "application/epub+zip": [".epub"],
      "application/x-ipynb+json": [".ipynb"],
      "text/x-python": [".py"],
    },
  });

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    open,
  };
};
