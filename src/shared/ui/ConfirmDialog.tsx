import { Btn } from './Btn';
import { Modal } from './Modal';

type ConfirmDialogProps = {
  text: string,
  close: () => void,
  confirm: () => void,
};
export const ConfirmDialog = ({ close, confirm, text }: ConfirmDialogProps) => {
  return (
    <Modal close={close} title="Are you sure?">
      <p className="text-center text-lg">{text}</p>
      <div className="flex justify-evenly mt-3">
        <Btn handler={confirm} text="Yes"></Btn>
        <Btn handler={close} text="No"></Btn>
      </div>
    </Modal>
  );
};
