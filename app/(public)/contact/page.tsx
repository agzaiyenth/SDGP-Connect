import ContactForm from "@/components/contact/contactForm";
import React from "react";

interface Props {}

const page = (props: Props) => {
  return (
    <div className="mx-auto py-8 px-4 space-y-4 w-full">
      <ContactForm />
    </div>
  );
};

export default page;
