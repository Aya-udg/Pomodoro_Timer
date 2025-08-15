import { useForm } from "react-hook-form";
import { TodoFormData, Schedule, UpdateTodoFormData } from "@/app/types/index";
import { postSchedule } from "@/lib/api/calendar";
import { useState, useEffect } from "react";
import { updateSchedule } from "@/lib/api/calendar";
import { deleteSchedule } from "@/lib/api/calendar";
import { getSchedule } from "@/lib/api/calendar";
import { useSchedule } from "@/context/EventContext";
import { format } from "date-fns-tz";
import { toZonedTime } from "date-fns-tz";
import CustomAlertDialog from "./CustomAlertDialog";
import { useUserStore } from "@/app/components/userStore";
import { useRouter } from "next/navigation";

type Props = {
  onOpenChange: (open: boolean) => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
};

export default function ClendarForm({
  onOpenChange,
  onSuccess,
  onError,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({ mode: "onBlur" });

  // 編集用トリガー
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  // 削除用トリガー
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { setEvents, selectedEvent, selectedDate } = useSchedule();

  const { username } = useUserStore();

  const router = useRouter();

  // 情報更新
  const onUpdate = async (data: TodoFormData) => {
    const updateData: UpdateTodoFormData = {
      ...data,
      id: selectedEvent?.id ?? "",
      description: data.title,
      timer: 25,
      completed: false,
    };
    await updateSchedule(updateData);
    onOpenChange(false); //ダイアログを閉じる
    reset(); // フォーム初期化
    const events_list = await getSchedule();
    setEvents(events_list);
    onSuccess("更新しました");
  };

  // 更新に失敗したとき
  const onInvalid = () => {
    setIsUpdateDialogOpen(false); //ダイアログを閉じる
    onError("更新に失敗しました");
  };

  // 登録
  const onCreate = async (data: TodoFormData) => {
    if (!username) {
      onError("ログインしてください");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      const defaultData = {
        ...data,
        timer: 25,
        completed: false,
      };
      const res = await postSchedule(defaultData);
      onOpenChange(false); //ダイアログを閉じる
      reset(); // フォーム初期化
      if (res) {
        await getSchedule();
        onSuccess("登録しました");
      } else {
        onError("エラーが発生しました");
      }
    }
  };

  // 削除
  const onDelete = async (event: Schedule) => {
    await deleteSchedule(event.id);
    onOpenChange(false); //ダイアログを閉じる
    reset(); // フォーム初期化
    onSuccess("削除しました");
  };

  // 開始時間が変更されたら終了時間も変更
  const start = watch("start");

  useEffect(() => {
    if (selectedEvent?.end) {
      setValue("end", formatDateTime(selectedEvent.end));
    } else {
      setValue("end", start);
    }
  }, [selectedEvent, setValue, start]);

  const formatDateTime = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    const utcDate = new Date(dateStr);
    // タイムゾーンを日本時間に
    const zonedDate = toZonedTime(utcDate, "Asia/Tokyo");
    return format(zonedDate, "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onCreate)} className="grid">
      <div>
        <div className="flex items-center mb-5">
          <p className=" text-gray-700 text-sm font-bold mb-2">開始日：</p>
          <input
            className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="datetime-local"
            id="start"
            {...register("start")}
            defaultValue={formatDateTime(
              selectedEvent ? selectedEvent.start : selectedDate
            )}
          />
        </div>
        <div className="flex items-center mb-5">
          <p className=" text-gray-700 text-sm font-bold mb-2">終了日：</p>
          <input
            className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="datetime-local"
            id="end"
            {...register("end", {
              validate: (value) => {
                if (value < start) {
                  return "開始日より後の日時を選択してください";
                }
              },
            })}
            defaultValue={formatDateTime(
              selectedEvent ? selectedEvent.end : selectedDate
            )}
          />
        </div>
        <p className="text-red-500">{errors.end?.message}</p>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          タイトル名
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          defaultValue={selectedEvent ? selectedEvent.title : ""}
          {...register("title", {
            required: "タイトルは必須です",
            validate: (data) => {
              return data.trim() !== "" || "空欄だけの入力は無効です";
            },
          })}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </div>
      <div className="mb-6 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          メモ
        </label>
        <textarea
          defaultValue={selectedEvent?.memo ? selectedEvent.memo : ""}
          {...register("memo")}
          id="memo"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        <div className="mb-6 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            予定の色
          </label>
          <input
            id="color"
            type="color"
            defaultValue={selectedEvent ? selectedEvent.color : "#3788D8"}
            list="color-picker"
            {...register("color")}
          />
          <datalist id="color-picker">
            <option value="#DBDD69" />
            <option value="#82C567" />
            <option value="#E25555" />
          </datalist>
        </div>
      </div>
      <div>
        {selectedEvent ? (
          <CustomAlertDialog
            handleSubmit={handleSubmit}
            onUpdate={onUpdate}
            onInvalid={onInvalid}
            onDelete={onDelete}
            isUpdateDialogOpen={isUpdateDialogOpen}
            setIsUpdateDialogOpen={setIsUpdateDialogOpen}
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          ></CustomAlertDialog>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            保存
          </button>
        )}
      </div>
    </form>
  );
}
