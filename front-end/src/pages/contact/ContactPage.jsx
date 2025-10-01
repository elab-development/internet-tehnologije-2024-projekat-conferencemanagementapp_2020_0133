import { useState } from "react";
import InputField from "./components/InputField";
import TextAreaInput from "./components/TextAreaInput";
import { toast } from "sonner";

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const handleSubmition = (e) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
      toast.success("Successfully sent message! We will answer you in shortest time possible.");
  };
  const onValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full flex flex-col-reverse overflow-y-auto lg:flex-row px-8 lg:
    lg:justify-between lg:px-6 xl:px-36 2xl:px-48 my-32 opacity-0 animate-[fadeInBounce_1s_ease-out_0.5s_forwards] ">
      <div className="mt-16 h-[60vh] text-start text-lg text-gray-700 flex-schrink-0">
        <h2 className="text-4xl font-semibold text-gray-800">
          Company information
        </h2>
        <p className="py-6">
          Jove Ilica 154, <br />
          Belgrade, Serbia, <br />
          11010
        </p>
        <p className="">
          Sales:{" "}
          <a
            href="mailto:sales@confe.com"
            className="text-blue-600 font-light hover:underline"
          >
            sales@confe.com
          </a>
          <br />
          Tel:{" "}
          <a
            href="tel:+381612345678"
            className="text-blue-600 font-light hover:underline"
          >
            +381612345678
          </a>
          <br></br>
          Support:{" "}
          <a
            href="mailto:"
            className="text-blue-600 hover:underline font-light"
          >
            support@confe.com
          </a>
        </p>
      </div>
      <div className="p-8 rounded-4xl border border-gray-300 shadow-xl w-full lg:max-w-xl h-fit">
        <h3 className="text-xl font-semibold">Get in touch</h3>
        <form onSubmit={handleSubmition} className="flex flex-col">
          <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:space-x-8 lg:space-y-0 space-y-8 my-8">
            <InputField
              label={"First name"}
              name={"firstName"}
              value={formData.firstName}
              onChange={onValueChange}
            />
            <InputField
              label={"Last name"}
              name={"lastName"}
              value={formData.lastName}
              onChange={onValueChange}
            />
          </div>
          <InputField
            label={"Email"}
            name={"email"}
            value={formData.email}
            onChange={onValueChange}
            required={true}
          />
          <TextAreaInput
            className="mt-8 max-h-[15vh] h-64"
            label={"Message"}
            value={formData.description}
            onValueChange={onValueChange}
            name={"message"}
          />
          <button className="mt-16 px-4 py-3 rounded-2xl  text-white bg-blue-600 hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
