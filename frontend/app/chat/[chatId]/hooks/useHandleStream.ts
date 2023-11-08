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

      // masao
      let was_intermidiate_json = false;
      let intermidiate_json = "";

      // ここで処理しているのは間違いない。sleep 入れる?
      dataStrings.forEach((data) => {
        // ここのデータは json なので注意。単なる文字列でないから concatenate できない。
        // 中途半端な json
        console.log(">> debug > going to json.parse");
        let data_chunk = data.trim(); // このデータは json
        if (was_intermidiate_json) {
          data_chunk = intermidiate_json + data_chunk;
        }
        console.log(data_chunk);
        try {
          // 取り敢えず json に変換してみるが、ダメな場合は中途半端な json
          const parsedData = JSON.parse(data_chunk) as ChatMessage;
          updateStreamingHistory(parsedData);
          // 成功すればクリア
          was_intermidiate_json = false;
          intermidiate_json = "";
        } catch (error) {
          // ここにくるなら中途半端な json
          console.log(error);
          was_intermidiate_json = true;
          intermidiate_json = intermidiate_json + data_chunk
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
