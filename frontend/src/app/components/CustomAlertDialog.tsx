import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { TodoFormData, Schedule } from "@/app/types/index";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSchedule } from "@/context/EventContext";

type Props = {
  handleSubmit: (
    onValid: SubmitHandler<TodoFormData>,
    onInvalid?: SubmitErrorHandler<TodoFormData> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onUpdate: (data: TodoFormData) => void;
  onInvalid: SubmitErrorHandler<TodoFormData>;
  onDelete: (event: Schedule) => void;

  
  // 編集用トリガー
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // 削除用トリガー
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomAlertDialog({
  handleSubmit,
  onUpdate,
  onInvalid,
  onDelete,
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: Props) {
  const { selectedEvent } = useSchedule();

  return (
    <div className="flex justify-around">
      <div>
        {/* asChildをつけると中に書いたボタンがそのままトリガーになる */}
        <AlertDialog
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              編集して保存
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に保存しますか？</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  type="button"
                  onClick={handleSubmit(onUpdate, onInvalid)}
                >
                  OK
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        {/* asChildをつけると中に書いたボタンがそのままトリガーになる */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              削除
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <button type="button" onClick={() => onDelete(selectedEvent!)}>
                  OK
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
