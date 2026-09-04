import { useRouter } from "next/router";
import { t } from "@lingui/core/macro";
import { HiMiniPlus } from "react-icons/hi2";

import Avatar from "~/components/Avatar";
import CheckboxDropdown from "~/components/CheckboxDropdown";
import { useModal } from "~/providers/modal";
import { usePopup } from "~/providers/popup";
import { api } from "~/utils/api";
import { invalidateCard } from "~/utils/cardInvalidation";

interface MemberSelectorProps {
  cardPublicId: string;
  members: {
    key: string;
    value: string;
    selected: boolean;
    leftIcon: React.ReactNode;
    imageUrl: string | undefined;
  }[];
  isLoading: boolean;
  disabled?: boolean;
}

export default function MemberSelector({
  cardPublicId,
  members,
  isLoading,
  disabled = false,
}: MemberSelectorProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const { openModal } = useModal();
  const { showPopup } = usePopup();

  const addOrRemoveMember = api.card.addOrRemoveMember.useMutation({
    onMutate: async (update) => {
      await utils.card.byId.cancel();

      const previousCard = utils.card.byId.getData({ cardPublicId });

      utils.card.byId.setData({ cardPublicId }, (oldCard) => {
        if (!oldCard) return oldCard;

        const hasMember = oldCard.members.some(
          (member) => member.publicId === update.workspaceMemberPublicId,
        );

        const memberToAdd = oldCard.members.find(
          (member) => member.publicId === update.workspaceMemberPublicId,
        );

        const updatedMembers = hasMember
          ? oldCard.members.filter(
              (member) => member.publicId !== update.workspaceMemberPublicId,
            )
          : [
              ...oldCard.members,
              {
                publicId: update.workspaceMemberPublicId,
                email: memberToAdd?.email ?? "",
                deletedAt: null,
                user: {
                  id: memberToAdd?.user?.id ?? "",
                  name: memberToAdd?.user?.name ?? "",
                },
              },
            ];

        return {
          ...oldCard,
          members: updatedMembers,
        };
      });

      return { previousCard };
    },
    onError: (_error, _newList, context) => {
      utils.card.byId.setData({ cardPublicId }, context?.previousCard);
      showPopup({
        header: t`Unable to update members`,
        message: t`Please try again later, or contact customer support.`,
        icon: "error",
      });
    },
    onSettled: async () => {
      await invalidateCard(utils, cardPublicId);
      await utils.board.byId.invalidate();
    },
  });

  const selectedMembers = members.filter((member) => member.selected);

  const handleInviteMember = async () => {
    await router.push(`/members`);
    openModal("INVITE_MEMBER");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex w-full">
          <div className="h-full w-[125px] animate-pulse rounded-sm bg-light-300 dark:bg-dark-300" />
        </div>
      ) : (
        <CheckboxDropdown
          items={members}
          handleSelect={(_, member) => {
            addOrRemoveMember.mutate({
              cardPublicId,
              workspaceMemberPublicId: member.key,
            });
          }}
          handleCreate={disabled ? undefined : handleInviteMember}
          createNewItemLabel={t`Invite member`}
          ariaLabel={t`Members`}
          disabled={disabled}
          asChild
        >
          <div
            className={`flex h-full w-full items-center rounded-sm border-2 border-hairline py-1 pl-2 text-left text-xs text-light-1000 dark:border-hairline dark:text-dark-1000 ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-hairline hover:bg-light-200 dark:hover:border-hairline dark:hover:bg-dark-100"}`}
          >
            {selectedMembers.length ? (
              <div className="isolate flex justify-end -space-x-1 overflow-hidden">
                {selectedMembers.map(({ value, imageUrl }) => (
                  <Avatar
                    key={value}
                    size="sm"
                    name={value}
                    imageUrl={imageUrl}
                    email={value}
                  />
                ))}
              </div>
            ) : (
              <>
                <HiMiniPlus size={22} className="pr-2" />
                {t`Add member`}
              </>
            )}
          </div>
        </CheckboxDropdown>
      )}
    </>
  );
}
