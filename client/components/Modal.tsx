import { ReactNode } from "react";

type ModalProps = {
    children?: ReactNode;
    open: any;
    onClose: () => void;
}

export default function Modal(props:ModalProps) {
  return (
    <>
      {props.open ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative my-6 mx-auto max-w-3xl p-4 w-full">
              {/*content*/}
              <div className="max-h-screen overflow-auto py-4 border-0 rounded-lg shadow-lg relative p-4 flex flex-col w-full bg-white outline-none focus:outline-none">
                {props.children}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}