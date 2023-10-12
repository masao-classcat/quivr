import { useChatContext } from "@/lib/context";

import { ChatMessage } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleStream = () => {
  const { updateStreamingHistory } = useChatContext();

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<void> => {
    const decoder = new TextDecoder("utf-8");

    const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  
    const handleStreamRecursively = async () => {
      // ここが繰り返し呼ばれる。debug tool をかませるとエラーが起きない。
      console.log("### debug > IN handleStream::handleStreamRecursively (frontend/app/chat/[chatId]/hooks/useHandleStream.js")

      const { done, value } = await reader.read();

      if (done) {
        return;
      }

      const dataStrings = decoder
        .decode(value)
        .trim()
        .split("data: ")
        .filter(Boolean);

      // ここで処理しているのは間違いない。sleep 入れる?
      dataStrings.forEach((data) => {
        sleep(10); //ms
        console.log(">> debug > going to json.parse");
        try {
          const parsedData = JSON.parse(data) as ChatMessage;
          updateStreamingHistory(parsedData);
        } catch (error) {
          console.log(error);
        }
      });

      await handleStreamRecursively();
    };

    await handleStreamRecursively();
  };

  return {
    handleStream,
  };
};
