import { useEffect, useRef, useState } from "react";
import settings from "../../assets/exp-settings.svg";
import deleteImg from "../../assets/delete.svg";
import down_arrow from "../../assets/down-arrow.svg";
import empty from "../../assets/empty.svg";
import { toast } from "react-toastify";
import useCloseComponent from "../../hooks/useCloseComponent";
import {
  useAddCategories,
  useDeleteCategories,
  useGetCategories,
} from "../../lib/react-query/queriesAndMutations";
import { TCategory } from "../../types/types";
import IconCustomize from "../../components/categories/IconCustomize";
import NewIconCustomize from "../../components/categories/NewIconCustomize";
import ShowType from "../../components/categories/ShowType";
import EditCategory from "../../components/categories/EditCategory";
import NavMenu from "../../components/shared/NavMenu";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/shared/Loader";

const Categories = () => {
  const { setShowSidebar } = useOutletContext<{
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  const { data, isLoading } = useGetCategories();
  const { mutateAsync: addCategories } = useAddCategories();
  const { mutateAsync: deleteCategories } = useDeleteCategories();
  const [showType, setShowType] = useState(false);
  const [showIconCustomize, setShowIconCustomize] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState("");
  const [colorSelected, setColorSelected] = useState("A52A2A");
  const [iconSelected, setIconSelected] = useState("/rent.svg");
  const [newColorSelected, setNewColorSelected] = useState("");
  const [newIconSelected, setNewIconSelected] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [typeSelected, setTypeSelected] = useState("Expenses");
  const [expenseArr, setExpenseArr] = useState<TCategory[]>([]);
  const [incomeArr, setIncomeArr] = useState<TCategory[]>([]);
  const iconToggleRef = useRef<HTMLDivElement | null>(null);
  const typeToggleRef = useRef<HTMLDivElement | null>(null);
  const newIconToggleRef = useRef<HTMLDivElement | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showNewIconCustomize, setShowNewIconCustomize] = useState(false);

  const typeRef = useCloseComponent(() => setShowType(false), typeToggleRef);
  const iconRef = useCloseComponent(
    () => setShowIconCustomize(false),
    iconToggleRef
  );
  const newIconRef = useCloseComponent(
    () => setShowNewIconCustomize(false),
    newIconToggleRef
  );

  useEffect(() => {
    if (data) {
      setExpenseArr(data[0]?.expenses || []);
      setIncomeArr(data[0]?.income || []);
      setInitialLoading(false);
    }
  }, [data]);

  const createCategory = async (
    colorSelected: string,
    iconSelected: string,
    categoryName: string,
    typeSelected: string
  ) => {
    await addCategories({
      colorPicked: colorSelected,
      iconPicked: iconSelected,
      categoryName: categoryName,
      typePicked: typeSelected,
    });

    setColorSelected("A52A2A");
    setIconSelected("/assets/rent.svg");
    setCategoryName("");
    setTypeSelected("Expenses");

    return toast.success("Category successfully created");
  };

  const deleteCategory = async (category: string, type: string) => {
    await deleteCategories({ categoryName: category, type: type });
    return toast.success("Category successfully deleted");
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full px-[1rem] lg:px-[5rem] py-4">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[1.7rem] font-bold"> Categories </h1>
          <NavMenu setShowSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 justify-start relative ">
          <div className="w-full lg:w-[50%] flex flex-col xmd:flex-row gap-5">
            <div className="w-full xmd:w-[20%]">
              <span className="text-[.8rem]"> Icon </span>
              <div
                ref={iconToggleRef}
                className="py-2 px-1 flex justify-center items-center bg-[#1A222B] rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowIconCustomize((val) => !val);
                  setShowType(false);
                }}
              >
                <div
                  className={`w-[46px] h-[46px] flex justify-center items-center bg-[#${
                    colorSelected ? colorSelected : "A52A2A"
                  }] rounded-full cursor-pointer`}
                >
                  <img
                    src={
                      iconSelected
                        ? iconSelected
                        : `https://xtrack-main.onrender.com/assets/rent.svg`
                    }
                    alt="rent"
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </div>
            </div>
            <div className="w-full xmd:w-[80%] ">
              <span className="text-[.8rem]"> Name </span>
              <div className="w-full bg-[#1A222B] p-5 rounded-lg text-[#FFFFFF]">
                <input
                  type="text"
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Category Name"
                  onChange={(e) => setCategoryName(e.currentTarget.value)}
                  value={categoryName}
                />
              </div>
            </div>
          </div>

          <IconCustomize
            setColorSelected={setColorSelected}
            setIconSelected={setIconSelected}
            iconRef={iconRef}
            showIconCustomize={showIconCustomize}
          />

          <div className="lg:w-[50%] flex flex-col xmd:flex-row gap-5">
            <div className="xmd:w-[50%] lg:w-[50%]">
              <span className="text-[.8rem]"> Type </span>
              <div
                className="bg-[#1A222B] py-5 px-5 flex justify-between items-center rounded-lg text-[#FFFFFF]"
                ref={typeToggleRef}
              >
                <h1> {typeSelected} </h1>
                <img
                  src={down_arrow}
                  className={`w-5 h-5 ${
                    showType && "rotate-180"
                  } cursor-pointer transition-all`}
                  onClick={() => {
                    setShowType((val) => !val);
                    setShowIconCustomize(false);
                  }}
                />
              </div>
            </div>

            <div
              className="xmd:w-[50%] lg:w-[50%] flex items-end"
              onClick={() =>
                createCategory(
                  colorSelected,
                  iconSelected,
                  categoryName,
                  typeSelected
                )
              }
            >
              <button className="w-full lg:w-auto bg-[#228B22] hover:bg-[#228835] py-5 lg:py-2 ctg:py-5 px-10 lg:px-5 xmlg:px-10 rounded-lg transition-all cursor-pointer">
                Create Category
              </button>
            </div>
          </div>

          <ShowType
            typeRef={typeRef}
            setTypeSelected={setTypeSelected}
            setShowType={setShowType}
            showType={showType}
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[50%] flex flex-col">
          <h1 className="font-bold text-[1.2rem] mb-2"> Expenses </h1>
          <hr className="mb-5" />
          <div className="w-full h-[28rem]  flex flex-col gap-5 relative overflow-y-scroll ">
            {isLoading || initialLoading ? (
              <Loader />
            ) : expenseArr.length > 0 ? (
              expenseArr.map((ex, i) => {
                return (
                  <div key={i}>
                    <div
                      className=" flex justify-between items-center relative"
                      key={i}
                    >
                      <div className="flex gap-5 items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-[46px] h-[46px] flex justify-center items-center bg-[#${ex.color}] rounded-full`}
                          >
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <img
                                src={ex.icon}
                                alt="rent"
                                className="w-[30px] h-[30px]"
                              />
                            )}
                          </div>
                          <div>
                            <h1 className="text-[.8rem] font-bold">
                              {ex.category}
                            </h1>
                            <span className="text-[.7rem] sm:hidden lg:block xl:hidden">
                              {ex.transactionCount} Transactions
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[4rem] md:gap-[15rem] lg:gap-2 xl:gap-[5rem]">
                        <span className="hidden sm:block lg:hidden xl:block text-[.7rem]">
                          {ex.transactionCount} Transactions
                        </span>
                        <div className="flex gap-3">
                          <img
                            src={settings}
                            alt="settings"
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => {
                              setEditCategory((val) =>
                                categoryToEdit === ex.category ? !val : true
                              );
                              setCategoryToEdit(ex.category);
                              setNewCategoryName("");
                              setNewColorSelected("");
                              setNewIconSelected("");
                              setShowNewIconCustomize(false);
                            }}
                          />
                          <img
                            src={deleteImg}
                            alt="delete"
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => deleteCategory(ex.category, ex.type)}
                          />
                        </div>
                      </div>

                      <NewIconCustomize
                        setNewColorSelected={setNewColorSelected}
                        setNewIconSelected={setNewColorSelected}
                        newIconRef={newIconRef}
                        showNewIconCustomize={showNewIconCustomize}
                        categoryToEdit={categoryToEdit}
                        ex={ex}
                      />
                    </div>

                    <EditCategory
                      setEditCategory={setEditCategory}
                      setNewCategoryName={setNewCategoryName}
                      setNewColorSelected={setNewColorSelected}
                      newIconToggleRef={newIconToggleRef}
                      newCategoryName={newCategoryName}
                      newColorSelected={newColorSelected}
                      newIconSelected={newIconSelected}
                      setShowNewIconCustomize={setShowNewIconCustomize}
                      showNewIconCustomize={showNewIconCustomize}
                      ex={ex}
                      editCategory={editCategory}
                      categoryToEdit={categoryToEdit}
                    />
                  </div>
                );
              })
            ) : (
              <div className="mt-10 flex flex-col justify-center items-center ">
                <img src={empty} alt="empty" className="w-[10rem]" />
                <h1 className="text-[1.5rem]">Expenses category is empty</h1>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col">
          <h1 className="font-bold text-[1.2rem] mb-2"> Income </h1>
          <hr className="mb-5" />
          <div className="w-full h-[28rem] flex flex-col gap-5 relative overflow-y-scroll ">
            {isLoading || initialLoading ? (
              <Loader />
            ) : incomeArr.length > 0 ? (
              incomeArr.map((ex, i) => {
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center relative">
                      <div className="flex gap-5 items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-[46px] h-[46px] flex justify-center items-center bg-[#${ex.color}] rounded-full`}
                          >
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <img
                                src={ex.icon}
                                alt="rent"
                                className="w-[30px] h-[30px]"
                              />
                            )}
                          </div>
                          <div>
                            <h1 className="text-[.8rem] font-bold">
                              {ex.category}
                            </h1>
                            <span className="text-[.7rem] sm:hidden lg:block xl:hidden">
                              {ex.transactionCount} Transactions
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-[4rem] md:gap-[15rem] lg:gap-2 xl:gap-[5rem]">
                        <span className="hidden sm:block lg:hidden xl:block text-[.7rem]">
                          {ex.transactionCount} Transactions
                        </span>

                        <div className="flex gap-3">
                          <img
                            src={settings}
                            alt="settings"
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => {
                              setEditCategory((val) =>
                                categoryToEdit === ex.category ? !val : true
                              );
                              setCategoryToEdit(ex.category);
                              setNewCategoryName("");
                              setNewColorSelected("");
                              setNewIconSelected("");
                              setShowNewIconCustomize(false);
                            }}
                          />
                          <img
                            src={deleteImg}
                            alt="delete"
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => deleteCategory(ex.category, ex.type)}
                          />
                        </div>
                      </div>

                      <NewIconCustomize
                        setNewColorSelected={setNewColorSelected}
                        setNewIconSelected={setNewColorSelected}
                        newIconRef={newIconRef}
                        showNewIconCustomize={showNewIconCustomize}
                        categoryToEdit={categoryToEdit}
                        ex={ex}
                      />
                    </div>

                    <EditCategory
                      setEditCategory={setEditCategory}
                      setNewCategoryName={setNewCategoryName}
                      setNewColorSelected={setNewColorSelected}
                      newIconToggleRef={newIconToggleRef}
                      newCategoryName={newCategoryName}
                      newColorSelected={newColorSelected}
                      newIconSelected={newIconSelected}
                      setShowNewIconCustomize={setShowNewIconCustomize}
                      showNewIconCustomize={showNewIconCustomize}
                      ex={ex}
                      editCategory={editCategory}
                      categoryToEdit={categoryToEdit}
                    />
                  </div>
                );
              })
            ) : (
              <div className="mt-10 flex flex-col justify-center items-center ">
                <img src={empty} alt="empty" className="w-[10rem]" />
                <h1 className="text-[1.5rem]">Income category is empty</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
