import { useChatContext } from "@/lib/context";

import { ChatMessage } from "../types";

/*
masao : 15-nov-23 : バックエンドからの json ストリームの変換の修正
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleStream = () => {
  const { updateStreamingHistory } = useChatContext();

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
    // v126
    onFirstChunk: () => void
  ): Promise<void> => {
    const decoder = new TextDecoder("utf-8");
    // v126
    let isFirstChunk = true;

    // 不十分な json を保持する。
    let was_intermidiate_json = false;
    let intermidiate_json = "";    

    const handleStreamRecursively = async () => {
      console.log(">> debug > IN handleStream::handleStreamRecursively (frontend/app/chat/[chatId]/hooks/useHandleStream.js")

      const { done, value } = await reader.read();

      if (done) {
        return;
      }

      // v126
      if (isFirstChunk) {
        isFirstChunk = false;
        onFirstChunk();
      }

      const dataStrings = decoder
        .decode(value)
        .trim()
        .split("data: ")
        .filter(Boolean);

      dataStrings.forEach((data) => {
        // json データの取得。json として不十分な chunk が上がるのが問題。
        // 単なる文字列でないから concatenate できないことに注意。
        console.log("\n>> debug > IN dataString.forEach --- * --- * ---");
        // console.log(">> debug > IN dataString.forEach : 取得した data chunk は ->");

        let data_chunk = data.trim(); // このデータは json または不十分な json
        // console.log (data_chunk);
        if (was_intermidiate_json) {  // 前回が中途半端なら連結する。
          data_chunk = intermidiate_json + data_chunk;
          console.log("前回エラー発生したので連結して parse します ->");
          console.log(data_chunk);
        }
        // console.log ("parse する data chunk は ->");
        // console.log(data_chunk);
        try {
          console.log(">> debug > call JSON.parse");
          // 取り敢えず json に変換してみるが、ダメな場合は中途半端な json
          const parsedData = JSON.parse(data_chunk) as ChatMessage;
          updateStreamingHistory(parsedData);
          // 成功すればクリア
          was_intermidiate_json = false;
          intermidiate_json = "";
          console.log(">> debug > 変換に成功！");
        } catch (error) {
          // ここにくるならまだ中途半端な json
          console.log("### Error ###")
          console.log(error);
          was_intermidiate_json = true;
          intermidiate_json = intermidiate_json + data_chunk

          console.log("Error が起きたので以下をキープ >>> ")
          console.log(intermidiate_json);
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
