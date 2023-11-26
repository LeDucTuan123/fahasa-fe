import { useCallback, useEffect, useState } from 'react';
import { storage } from 'src/services/firebase/firebase';

import { UploadTask, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { CategoryType } from 'src/types';
import ListTools from './ListTools';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

const formTool = {
  id: '',
  title: '',
  brand: '',
  price: 0,
  discount: 0,
  description: '',
  images: '',
  category: { id: 0 },
  product: { id: 2 },
};

export default function FormTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [dataTool, setDataTool] = useState(formTool);

  const [fetchDataTool, setfetchDataTool] = useState<any[]>([]);
  const [fetchDatacate, setfetchDataCate] = useState<any[]>([]);

  useEffect(() => {
    fetch
      .get(apiPaths.school2)
      .then((res) => setfetchDataTool(res.data))
      .catch((err) => console.log(err.message));
    fetch
      .get(apiPaths.category)
      .then((res) => setfetchDataCate(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setImageUpload(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const addTool = () => {
    try {
      setTimeout(() => {
        fetch({
          method: 'POST',
          url: 'http://localhost:8080/rest/schooltool',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            title: dataTool.title,
            brand: dataTool.brand,
            price: dataTool.price,
            discount: dataTool.discount,
            description: dataTool.description,
            images: String(dataTool.images),
            product: dataTool.product,
            category: dataTool.category,
          }),
        }).then((res) => {
          toast.success('Thêm sản phẩm thành công');
          setIsLoading(false);
          return setfetchDataTool((prev) => [
            //khi thêm thành công thì update lại state khỏi cần load lại page
            ...prev,
            [
              {
                id: res.data.id,
                brand: dataTool.brand,
                description: dataTool.description,
                discount: dataTool.discount,
                images: dataTool.images,
                price: dataTool.price,
                title: dataTool.title,
                category: dataTool.category,
              },
              dataTool.category.id,
            ],
          ]);
        });
        setDataTool(formTool);
      }, 2000);
    } catch (error) {
      toast.success('Thêm sản phẩm thất bại');
    }
  };

  // vì lí do state image set chậm 1 nhịp nên phải bỏ vào useEffect để khi image thay đổi giá trị thì addBook đc gọi
  useEffect(() => {
    if (!isShowEdit && isLoading && dataTool.images) {
      addTool();
    }
    if (isShowEdit && isLoading) {
      handleUploadImage();
    }
  }, [dataTool.images]);

  //thêm sản phẩm
  const handleAddTool = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (imageUpload === null) return toast.error('Vui lòng thêm ảnh');
    const id = Math.random() * 1000;
    const imageRef = ref(storage, `imagesFahasa/dungcu/add/${imageUpload.name + id} `);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);

    //Tải ảnh lên firebase
    uploadTask.on(
      'state_changed',
      (snapshot) => {
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
        console.log(error);
      },
      async () => {
        await getDowloadUrlImage(uploadTask);
      },
    );
    // addTool();
  };

  const getDowloadUrlImage = async (uploadTask: UploadTask) => {
    try {
      const img = await getDownloadURL(uploadTask.snapshot.ref);
      setDataTool({ ...dataTool, images: String(img) });
      console.log('File available at', dataTool.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTool = (item: any) => {
    setDataTool((prev) => ({
      ...prev,
      id: item.id,
      title: item.title,
      brand: item.brand,
      description: item.description,
      discount: item.discount,
      images: item.images,
      price: item.price,
      category: item.category,
    }));
    setIsShowEdit(true);
  };

  const handleUploadImage = () => {
    setTimeout(async () => {
      await fetch({
        method: 'PUT',
        url: `http://localhost:8080/rest/schooltool/${dataTool.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          brand: dataTool.brand,
          description: dataTool.description,
          discount: dataTool.discount,
          images: dataTool.images,
          price: dataTool.price,
          title: dataTool.title,
          product: dataTool.product,
          category: dataTool.category,
        }),
      });
      setIsLoading(false);
      setIsShowEdit(false);
      toast.success('Update thành công');

      setfetchDataTool((prev) =>
        prev.map((item) =>
          item[0].id === dataTool.id
            ? [
                {
                  ...item,
                  id: dataTool.id,
                  brand: dataTool.brand,
                  description: dataTool.description,
                  discount: dataTool.discount,
                  images: dataTool.images,
                  price: dataTool.price,
                  title: dataTool.title,
                  category: dataTool.category,
                },
                dataTool.category.id,
              ]
            : item,
        ),
      );
    }, 2000);
  };

  const handleUpdateTool = (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    const urlImage = ref(storage, dataTool.images);
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
    setDataTool(formTool);
  };
  return (
    <>
      <div className="w-full h-auto shadow-xl p-5 border-[1px] rounded-xl">
        <div className="flex pb-5">
          <div className="w-full">
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="col-span-3">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="floating_name"
                    id="floating_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={dataTool.title}
                    onChange={(e: any) => setDataTool((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <label
                    htmlFor="floating_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên Dụng cụ
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_author"
                    id="floating_author"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={dataTool.brand}
                    onChange={(e: any) => setDataTool((prev) => ({ ...prev, brand: e.target.value }))}
                  />
                  <label
                    htmlFor="floating_author"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Thương hiệu
                  </label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="floating_price"
                      id="floating_price"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={dataTool.price}
                      onChange={(e: any) => setDataTool((prev) => ({ ...prev, price: e.target.value }))}
                    />
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
                      required
                      value={dataTool.discount}
                      onChange={(e: any) => setDataTool((prev) => ({ ...prev, discount: e.target.value }))}
                    />
                    <label
                      htmlFor="floating_discount"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Giảm giá
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      id="underline_select"
                      // value={dataTool.category.id}
                      onChange={(e: any) => setDataTool((prev) => ({ ...prev, category: { id: e.target.value } }))}
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option selected>Loại dụng cụ</option>
                      {fetchDatacate
                        .filter(
                          (item: CategoryType) =>
                            item.parent &&
                            item.parent.parent &&
                            item.parent.parent.id === 3 &&
                            item.parent.parent.categoryname === 'Dụng cụ học sinh',
                        )
                        .map((item: CategoryType) => (
                          <option
                            value={item.id}
                            key={item.id}
                            selected={dataTool.category.id === item.id}
                          >
                            {item.categoryname}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Miêu tả dụng cụ
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                    // value={dataTool.description}
                    onChange={(e: any) => setDataTool((prev) => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                </div>

                {/* <div className="relative z-0 w-full mb-6 group">
                  <label
                    htmlFor="file-upload"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Upload ảnh
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    alt=""
                    className="cursor-pointer"
                    onChange={(e: any) => setImageUpload(e.target.files[0])}
                  />
                </div> */}

                <div className="relative z-0 w-full mb-6 group">
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
                {imageUpload || dataTool.images ? (
                  <img
                    src={dataTool.images ? dataTool.images : URL.createObjectURL(imageUpload)}
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
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={isShowEdit ? handleUpdateTool : handleAddTool}
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
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setIsShowEdit(false)}
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Xóa
                  </button>
                  <button
                    type="submit"
                    onClick={handleResetForm}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ListTools
        fetchDataTool={fetchDataTool}
        setFetchDataTool={setfetchDataTool}
        onHandleEditTool={handleEditTool}
      />
    </>
  );
}
