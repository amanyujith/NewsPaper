interface FormProps {
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    rating: number;
  };
}
const Form = ({ onChange, onClose, onSubmit, formData }: FormProps) => {
  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Close the dropdown if the click is outside of the dropdown content
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-container")) {
      onClose();
    }
  };

  return (
    <div>
      <div
        className="modal-container fixed  inset-0 z-40 flex items-center justify-end pr-7   bg-black bg-opacity-50 "
        onClick={handleCloseModal}
      >
        <div className="bg-white p-6 h-fit rounded-lg shadow-lg  w-11/12 md:w-1/2 lg:w-1/3">
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-2xl font-semibold w-full flex justify-end "
          >
            X
          </button>
          <label htmlFor="">
            What type of content would you like to see more?
          </label>
          <input
            type="text"
            value={formData.input1}
            name="input1"
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          <label htmlFor="">
            Do you find the reading experience comfortable?
          </label>
          <input
            type="text"
            value={formData.input2}
            name="input2"
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          <label htmlFor="">Are the headlines clear and engaging?</label>
          <input
            type="text"
            value={formData.input3}
            name="input3"
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          {/* <label htmlFor=""></label>
          <input
            type="text"
            value={formData.input4}
            name="input4"
            onChange={onChange}
            placeholder="How satisfied are you with the search functionality on our platform?"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          /> */}
          <label htmlFor="">Rate us out of 5</label>
          <input
            type="number"
            value={formData.rating}
            name="rating"
            onChange={onChange}
            min="1"
            max="5"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Form;
