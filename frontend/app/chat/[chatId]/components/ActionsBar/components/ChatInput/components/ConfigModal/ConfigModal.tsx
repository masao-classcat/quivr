/* eslint-disable max-lines */
import { useTranslation } from "react-i18next";
import { MdCheck, MdSettings } from "react-icons/md";

import Button from "@/lib/components/ui/Button";
import { Modal } from "@/lib/components/ui/Modal";
import { defineMaxTokens } from "@/lib/helpers/defineMaxTokens";

import { useConfigModal } from "./hooks/useConfigModal";

export const ConfigModal = (): JSX.Element => {
  const {
    handleSubmit,
    isConfigModalOpen,
    setIsConfigModalOpen,
    register,
    maxTokens,
    model,
    accessibleModels,
  } = useConfigModal();
  const { t } = useTranslation("config");

  // masao : 12-oct-23 : localization
  return (
    <Modal
      Trigger={
        <Button
          className="p-2 sm:px-3"
          variant={"tertiary"}
          data-testid="config-button"
        >
          <MdSettings className="text-lg sm:text-xl lg:text-2xl" />
        </Button>
      }
      title="チャット設定"
      desc="チャット設定を調整します"
      isOpen={isConfigModalOpen}
      setOpen={setIsConfigModalOpen}
      CloseTrigger={<div />}
    >
      <form className="mt-10 flex flex-col items-center gap-2">
        <fieldset className="w-full flex flex-col">
          <label className="flex-1 text-sm" htmlFor="model">
            {t("modelLabel")}
          </label>
          <select
            {...register("model")}
            className="px-5 py-2 dark:bg-gray-700 bg-gray-200 rounded-md"
          >
            <option value="">{t("modelLabel")}</option>
            {accessibleModels.map((availableModel) => (
              <option value={availableModel} key={availableModel}>
                {availableModel}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="w-full flex mt-4">
          <label className="flex-1" htmlFor="tokens">
            最大トークン数: {maxTokens}
          </label>
          <input
            type="range"
            min="10"
            max={defineMaxTokens(model)}
            value={maxTokens}
            {...register("maxTokens")}
          />
        </fieldset>

        <Button
          className="mt-12 self-end"
          type="button"
          onClick={() => {
            handleSubmit();
            setIsConfigModalOpen(false);
          }}
        >
          保存
          <MdCheck className="text-xl" />
        </Button>
      </form>
    </Modal>
  );
};
