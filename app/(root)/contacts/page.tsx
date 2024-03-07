import React from "react";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { getContacts } from "@/utils/server/settings/getContacts";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";

// TODO: getData from db
const ContactPage = async () => {
  const contacts = await getContacts();

  if (!contacts)
    return (
      <CustomReturnMessage>Contacts currently not added!</CustomReturnMessage>
    );
  return (
    <div className="padding-container flex-col">
      <h1>Contacts</h1>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="text-3xl border-[1px] rounded-full inline-block p-2">
              <LuPhone />
            </div>

            <div>
              <p>Phone:</p>
              <p>{contacts.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-3xl border-[1px] rounded-full inline-block p-2">
              <MdOutlineEmail />
            </div>
            <div>
              <p>Email:</p>
              <p>{contacts.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-3xl border-[1px] rounded-full inline-block p-2">
              <IoLocationOutline />
            </div>
            <div>
              <p>Physical location:</p>
              <p>{contacts.physicalLocation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
