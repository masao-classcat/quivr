import { useChatContext } from "@/lib/context";

import { ChatMessage } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleStream = () => {
  const { updateStreamingHistory } = useChatContext();

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<void> => {
    const decoder = new TextDecoder("utf-8");

    // const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  
    const handleStreamRecursively = async () => {
      // await sleep(10); //ms
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

      var was_error = false;
      var buf = "";
      // ここで処理しているのは間違いない。sleep 入れる?
      dataStrings.forEach((data) => {
        console.log(">> debug > going to json.parse");
        try {
          if (was_error) {
            console.log("prev error found, then concatenate prev data.")
            data = buf + data;
          }
          const parsedData = JSON.parse(data) as ChatMessage;
          updateStreamingHistory(parsedData);
          was_error = false;
          buf = "";
        } catch (error) {
          // エラーが起きる場合はデータが不十分である。
          // エラーが起きたことを示して、データを保存する。
          was_error = true;
          buf = buf + data;
          
          console.log(error);
          console.log(data);
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
