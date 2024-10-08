import { useState } from "react";
import { RoomsModalProps } from "../../types/types";
import { PiXBold } from "react-icons/pi";
import { createNewRoom, editRoomServer } from "src/api/RoomsApi";
import { showToast } from "src/utils/toast";
import { uploadImage } from "src/utils/helpers";
import { RoomType } from "../../types/types";
import { newRoomSchema, newRoomValues } from "src/validation/newRoomSchema";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useClickOutside from "../../hooks/useClickOutside";
import FormBlock from "./FormBlock";
import Label from "../common/Label";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import Overlay from "./Overlay";

const RoomsModal = ({ room, setIsRoomsModalOpen, setRooms, setNumberOfRooms }: RoomsModalProps) => {
  const modalRef = useClickOutside<HTMLFormElement>(() =>
    setIsRoomsModalOpen(false)
  );
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const isEditingSession = room ? true : false;

  const form = useForm<newRoomValues>({
    defaultValues: {
      name: room?.name || undefined,
      capacity: room?.capacity || undefined,
      regularPrice: room?.regularPrice || undefined,
      discount: room?.discount || undefined,
      description: room?.description || undefined,
      image: room?.image || undefined,
    },
    resolver: zodResolver(newRoomSchema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  const addNewRoom = async (formData: newRoomValues) => {
    try {
      setIsButtonLoading(true);
      const imageFile = formData.image[0];
      const imageUrl = await uploadImage(imageFile as File, 'roomsStorage');
      const newRoom = { ...formData, image: imageUrl as string };
      const data = await createNewRoom(newRoom);
      setRooms((prev) => [...prev, data])
      setNumberOfRooms((prev) => prev + 1)
      showToast("Room created successfully!");
    } catch (error) {
      console.error("Error creating new room:", error);
      showToast("Unable to create new room. Please try again later", "error");
    } finally {
      setIsButtonLoading(false);
      setIsRoomsModalOpen(false);
    }
  };

  const editCurrentRoom = async (formData: newRoomValues) => {
    if (room) {
      try {
        setIsButtonLoading(true);
        const updatedRoom: RoomType = {
          ...room,
          ...formData,
          image: formData.image,
        };
        const response = await editRoomServer(room.id, updatedRoom);
        if (response) {
          setRooms((prev) =>
            prev.map((r) => (r.id === room.id ? response : r))
          );
          showToast("Room updated successfully!");
        }
      } catch (error) {
        console.error("Error occurred: ", error);
        showToast("Unable to update room. Please try again later.", "error");
      } finally {
        setIsButtonLoading(false);
        setIsRoomsModalOpen(false);
      }
    }
  };

  return (
    <Overlay showChildren={true}>
      <form
        className="overflow-scroll lg:w-[800px] lg:max-h-[80vh] flex flex-col bg-neutral-50 dark:bg-slate-600 z-20 border px-8 py-8 relative"
        ref={modalRef}
        onSubmit={handleSubmit(isEditingSession ? editCurrentRoom : addNewRoom)}
      >
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200 dark:text-slate-200 dark:hover:border-neutral-50 dark:hover:border"
          onClick={() => setIsRoomsModalOpen(false)}
        />
        <FormBlock size="big" direction="row">
          <Label id="Room name" />
          <Input
            id="Room name"
            type="text"
            zod={{ ...register("name") }}
            error={errors.name}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Maximum capacity" />
          <Input
            id="Maximum capacity"
            type="number"
            zod={{ ...register("capacity") }}
            error={errors.capacity}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id={"Regular price"} />
          <Input
            id={"Regular price"}
            type="number"
            zod={{ ...register("regularPrice") }}
            error={errors.regularPrice}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Discount" />
          <Input
            id="Discount"
            type="number"
            zod={{ ...register("discount") }}
            error={errors.discount}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Description for website" />
          <TextArea
            id="Description for website"
            zod={{ ...register("description") }}
            error={errors.description}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Room photo" />
          <Input
            id="Room photo"
            type="file"
            zod={{ ...register("image") }}
            error={errors.image as FieldError}
          />
        </FormBlock>
        <ButtonWrapper justify="end">
          <PrimaryActionButton
            text="Cancel"
            clickHandler={() => setIsRoomsModalOpen(false)}
            color="white"
          />
          <PrimaryActionButton
            text={`${isEditingSession ? "Edit room" : "Create new room"}`}
            type="submit"
            color="yellow"
            isLoading={isButtonLoading}
          />
        </ButtonWrapper>
      </form>
    </Overlay>
  );
};

export default RoomsModal;
