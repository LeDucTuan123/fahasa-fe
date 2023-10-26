export default function Banner() {
  return (
    <div className="flex flex-row pt-2 h-[200px]">
      <div className="w-[70%]">
        <img
          src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-[30%]">
        <div className="h-[50%]">
          <img
            src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-[50%]">
          <img
            src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
