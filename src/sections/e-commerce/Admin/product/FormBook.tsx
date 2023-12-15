import { Icon } from '@iconify/react';
import { UploadTask, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { storage } from 'src/services/firebase/firebase';
import ListBook from './ListBook';
// import { apiPaths } from 'src/services/api/path-api';
// import { CategoryType } from 'src/types';
// import { BookType } from 'src/types/book';

const formBook = {
  id: '',
  title: '',
  author: '',
  price: 0,
  discount: 0,
  description: '',
  images: '',
  cats: [],
  product: { id: 1 },
};

export default function FormBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [dataBook, setDataBook] = useState(formBook);

  const [fetchDataBook, setfetchDataBook] = useState<any[]>([]);

  const [validateFormError, setValidateFormError] = useState<any>(null);

  useEffect(() => {
    fetch
      .get(apiPaths.book)
      .then((res: any) => setfetchDataBook(res.data))
      .catch((err: any) => console.log(err.message));
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setImageUpload(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const addBook = () => {
    try {
      setTimeout(() => {
        fetch({
          method: 'POST',
          url: 'http://localhost:8080/rest/book',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            title: dataBook.title,
            author: dataBook.author,
            price: dataBook.price,
            discount: dataBook.discount,
            description: dataBook.description,
            images: String(dataBook.images),
            product: dataBook.product,
            cats: dataBook.cats,
          }),
        }).then(() => {});
        toast.success('Thêm sản phẩm thành công');
        setIsLoading(false);

        return setfetchDataBook((prev) => [
          //khi thêm thành công thì update lại state khỏi cần load lại page
          ...prev,
          {
            id: dataBook.id,
            author: dataBook.author,
            description: dataBook.description,
            discount: dataBook.discount,
            images: dataBook.images,
            price: dataBook.price,
            title: dataBook.title,
          },
        ]);
      }, 2000);
      setDataBook(formBook); //reset form
    } catch (error) {
      toast.success('Thêm sản phẩm thất bại');
    }
  };

  // vì lí do state image set chậm 1 nhịp nên phải bỏ vào useEffect để khi image thay đổi giá trị thì addBook đc gọi
  useEffect(() => {
    if (!isShowEdit && isLoading && dataBook.images) {
      addBook();
    }
    if (isShowEdit && isLoading) {
      uploadImage();
    }
  }, [dataBook.images]);

  //validate form
  const validateForm = () => {
    if (dataBook.title.length === 0) {
      return true;
    } else if (dataBook.author.length === 0) {
      return true;
    }
    if (dataBook.description.length === 0) {
      return true;
    } else if (dataBook.price === 0) {
      return true;
    } else {
      return false;
    }
  };

  //thêm sản phẩm
  const handleAddBook = async (e: any) => {
    e.preventDefault();

    setValidateFormError(dataBook);
    if (validateForm()) {
      return;
    }

    if (imageUpload === null) return toast.error('Vui lòng thêm ảnh');
    setIsLoading(true);
    const id = Math.random() * 1000;
    const imageRef = ref(storage, `imagesFahasa/book/add-book/${imageUpload.name + id} `);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);

    //Tải ảnh lên firebase
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Quan sát các sự kiện thay đổi trạng thái như tiến trình, tạm dừng và tiếp tục
        // Lấy tiến độ nhiệm vụ, bao gồm số byte đã tải lên và tổng số byte cần tải lên
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      async () => {
        await getDowloadUrlImage(uploadTask);
      },
    );

    // addBook();
  };

  const getDowloadUrlImage = async (uploadTask: UploadTask) => {
    try {
      const img = await getDownloadURL(uploadTask.snapshot.ref);
      setDataBook({ ...dataBook, images: String(img) });
      console.log('File available at', dataBook.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBook = (item: any) => {
    console.log('first: ', item);
    setDataBook((prev) => ({
      ...prev,
      id: item.id,
      title: item.title,
      author: item.author,
      description: item.description,
      discount: item.discount,
      images: String(item.images),
      price: item.price,
    }));
    setIsShowEdit(true);
  };

  const uploadImage = () => {
    setTimeout(async () => {
      await fetch({
        method: 'PUT',
        url: `http://localhost:8080/rest/book/${dataBook.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          author: dataBook.author,
          description: dataBook.description,
          discount: dataBook.discount,
          images: String(dataBook.images),
          price: dataBook.price,
          title: dataBook.title,
        }),
      });

      setIsLoading(false);
      setIsShowEdit(false);
      toast.success('Update thành công');
      // return setfetchDataBook(fetdataUpdate);
      setfetchDataBook((prev) =>
        prev.map((item) =>
          item.id === dataBook.id
            ? {
                ...item,
                author: dataBook.author,
                description: dataBook.description,
                discount: dataBook.discount,
                images: dataBook.images,
                price: dataBook.price,
                title: dataBook.title,
              }
            : item,
        ),
      );
    }, 2000);
  };

  const handleUpdateBook = (e: any) => {
    e.preventDefault();

    setValidateFormError(dataBook);
    if (validateForm()) {
      return;
    }

    setIsLoading(true);

    const urlImage = ref(storage, dataBook.images);
    const pathImage = ref(storage, urlImage.fullPath);
    const uploadTask = uploadBytesResumable(pathImage, imageUpload);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Quan sát các sự kiện thay đổi trạng thái như tiến trình, tạm dừng và tiếp tục
        // Lấy tiến độ nhiệm vụ, bao gồm số byte đã tải lên và tổng số byte cần tải lên
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      async () => {
        await getDowloadUrlImage(uploadTask);
      },
    );
  };

  const handleResetForm = () => {
    setDataBook(formBook);
  };

  return (
    <>
      <div className="w-full h-auto shadow-xl p-5 border-[1px] rounded-xl">
        <div className="flex relative pb-5">
          <div className="w-full">
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="col-span-3">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    value={dataBook.id}
                    className="hidden"
                  />
                  <input
                    type="text"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="floating_name"
                    id="floating_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={dataBook.title}
                    onChange={(e: any) => setDataBook((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  {validateFormError && validateFormError.title.length === 0 && (
                    <div className="text-red-500 pt-3">Vui lòng thêm tên sản phẩm</div>
                  )}
                  <label
                    htmlFor="floating_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên sách
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_author"
                    id="floating_author"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={dataBook.author}
                    onChange={(e: any) => setDataBook((prev) => ({ ...prev, author: e.target.value }))}
                  />
                  {validateFormError && validateFormError.author.length === 0 && (
                    <div className="text-red-500 pt-3">Vui lòng thêm tác giả của sản phẩm</div>
                  )}
                  <label
                    htmlFor="floating_author"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tác giả
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="floating_price"
                    id="floating_price"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={dataBook.price}
                    onChange={(e: any) => setDataBook((prev) => ({ ...prev, price: e.target.value }))}
                  />
                  {validateFormError && validateFormError.price === 0 && (
                    <div className="text-red-500 pt-3">Vui lòng thêm giá sản phẩm lớn hơn 0</div>
                  )}
                  <label
                    htmlFor="floating_price"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Giá
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="floating_discount"
                    id="floating_discount"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={dataBook.discount}
                    onChange={(e: any) => setDataBook((prev) => ({ ...prev, discount: e.target.value }))}
                  />
                  <label
                    htmlFor="floating_discount"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Giảm giá
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6  group">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Miêu tả sách
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                    value={dataBook.description}
                    onChange={(e: any) => setDataBook((prev) => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                  {validateFormError && validateFormError.description.length === 0 && (
                    <div className="text-red-500 pt-3">Vui lòng thêm miêu tả sản phẩm</div>
                  )}
                </div>

                <div className="relative z-0 w-[100px] mb-6 group">
                  <div {...getRootProps()}>
                    <input
                      // type="file"
                      id="file-upload"
                      alt=""
                      className="cursor-pointer"
                      // value={imageUpload}
                      // onChange={(e: any) => setImageUpload(e.target.files[0])}
                      {...getInputProps()}
                    />
                    <label
                      htmlFor="file-upload"
                      className="block mb-2 text-sm font-medium text-slate-200 p-3 w-fit rounded-lg bg-slate-700 cursor-pointer active:bg-slate-900"
                    >
                      Chọn ảnh
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-2 ">
                {imageUpload || dataBook.images ? (
                  <img
                    src={dataBook.images ? dataBook.images : URL.createObjectURL(imageUpload)}
                    alt="Selected"
                    className="w-full h-[400px] object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    alt=""
                    className="w-full object-cover "
                  />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                // type="submit"
                disabled={isLoading ? true : false}
                className={
                  isShowEdit
                    ? 'bg-orange-300 text-white  hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    : ' bg-green-400 text-white  hover:bg-green-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-[96px] sm:w-auto px-5 py-2.5 text-center'
                }
                onClick={isShowEdit ? handleUpdateBook : handleAddBook}
              >
                {isLoading ? (
                  <Icon
                    icon={'mingcute:loading-fill'}
                    fontSize={24}
                    className="animate-spin"
                  />
                ) : isShowEdit ? (
                  'Sửa'
                ) : (
                  'Tạo mới'
                )}
              </button>
              {isShowEdit ? (
                <button
                  type="submit"
                  className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
                  onClick={() => setIsShowEdit(false)}
                >
                  Cancel
                </button>
              ) : (
                <>
                  {/* <button
                    type="submit"
                    className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Xóa
                  </button> */}
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    onClick={handleResetForm}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ListBook
        fetchDataBook={fetchDataBook}
        setFetchDataBook={setfetchDataBook}
        onHandleEditBook={handleEditBook}
      />
    </>
  );
}
