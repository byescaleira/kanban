import { t } from "@lingui/core/macro";

import CheckboxDropdown from "~/components/CheckboxDropdown";
import { usePopup } from "~/providers/popup";
import { api } from "~/utils/api";
import { invalidateCard } from "~/utils/cardInvalidation";

interface ListSelectorProps {
  cardPublicId: string;
  lists: {
    key: string;
    value: string;
    selected: boolean;
  }[];
  isLoading: boolean;
  disabled?: boolean;
}

export default function ListSelector({
  cardPublicId,
  lists,
  isLoading,
  disabled = false,
}: ListSelectorProps) {
  const utils = api.useUtils();

  const { showPopup } = usePopup();

  const updateCardList = api.card.update.useMutation({
    onMutate: async (newList) => {
      await utils.card.byId.cancel();

      const previousCard = utils.card.byId.getData({ cardPublicId });

      utils.card.byId.setData({ cardPublicId }, (oldCard) => {
        if (!oldCard) return oldCard;

        return {
          ...oldCard,
          list: {
            ...oldCard.list,
            publicId: newList.listPublicId ?? "",
            name: oldCard.list.name ?? "",
            board: oldCard.list.board ?? null,
          },
        };
      });

      return { previousCard };
    },
    onError: (_error, _newList, context) => {
      utils.card.byId.setData({ cardPublicId }, context?.previousCard);
      showPopup({
        header: t`Unable to update list`,
        message: t`Please try again later, or contact customer support.`,
        icon: "error",
      });
    },
    onSettled: async () => {
      await invalidateCard(utils, cardPublicId);
      await utils.board.byId.invalidate();
    },
  });

  const selectedList = lists.find((list) => list.selected);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full">
          <div className="h-full w-[150px] animate-pulse rounded-sm bg-light-300 dark:bg-dark-300" />
        </div>
      ) : (
        <CheckboxDropdown
          items={lists}
          handleSelect={(_, member) => {
            updateCardList.mutate({
              cardPublicId,
              listPublicId: member.key,
              index: 0,
            });
          }}
          disabled={disabled}
          asChild
          ariaLabel={t`Current list`}
        >
          <div
            className={`flex h-full w-full items-center rounded-sm border-2 border-hairline py-1 pl-2 text-left text-xs text-light-1000 dark:border-hairline dark:text-dark-1000 ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-hairline hover:bg-light-200 dark:hover:border-hairline dark:hover:bg-dark-100"}`}
          >
            {selectedList?.value}
          </div>
        </CheckboxDropdown>
      )}
    </>
  );
}
