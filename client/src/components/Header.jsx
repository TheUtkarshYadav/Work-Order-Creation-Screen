import { IoIosArrowBack } from 'react-icons/io';

export default function Header() {
  return (
    <div className='flex items-center justify-between'>
      <div className="flex items-center justify-center gap-1 font-bold text-lg">
        <IoIosArrowBack className='text-sm' />
        <p>Create Workorder</p>
      </div>
      <button 
        className="flex justify-center items-center text-white bg-teal-400 h-[40px] w-[120px] mx-10 border rounded-lg shadow-md"
      >
        Save
        </button>
    </div>
  )
}
