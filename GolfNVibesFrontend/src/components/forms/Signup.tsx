  "use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function  GNVSignup() {
   const [isOpenModal, setOpenModal] = useState(true);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const openModal = () => setOpenModal(false)
  
    return (
      <>
        <Modal show={isOpenModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
          <ModalHeader />
          <ModalBody>
            <div className="space-y-6">
              <div className="flex justify-between">
             
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
               <IoCloseCircleSharp onClick= {openModal} color="white" size={20}  />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput id="password" type="password" required />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-primary-700 hover:underline dark:text-primary-500">
                  Lost Password?
                </a>
              </div>
              <div className="w-full">
                <Button>Log in to your account</Button>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?&nbsp;
                <a href="#" className="text-primary-700 hover:underline dark:text-primary-500">
                  Create account
                </a>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
}

