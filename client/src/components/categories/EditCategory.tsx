import React from "react";
import { useModifyCategories } from "../../lib/react-query/queriesAndMutations";
import { TEditCategory, TExisting } from "../../types/types";
import { CSSTransition } from "react-transition-group";

const EditCategory: React.FC<TEditCategory> = ({
  setEditCategory,
  setNewCategoryName,
  setNewColorSelected,
  newIconToggleRef,
  newCategoryName,
  newColorSelected,
  newIconSelected,
  setShowNewIconCustomize,
  showNewIconCustomize,
  ex,
  editCategory,
  categoryToEdit,
}) => {
  const { mutateAsync: modifyCategories } = useModifyCategories();

  const modifyCategory = async (
    type: string,
    category: string,
    existing: TExisting,
    newCategoryName: string,
    newColorSelected: string,
    newIconSelected: string
  ) => {
    try {
      await modifyCategories({
        type: type,
        category: category,
        existing: existing,
        newName: newCategoryName,
        newColor: newColorSelected,
        newIcon: newIconSelected,
      });

      setEditCategory(false);
      setNewCategoryName("");
      setNewColorSelected("");
    } catch (error) {
      console.error("Modify failed:", error);
    }
  };

  return (
    <CSSTransition
      in={editCategory && ex.category === categoryToEdit}
      timeout={300}
      classNames="icon-customize"
      unmountOnExit
    >
      <div className="flex flex-col xmd:flex-row lg:flex-col xl:flex-row gap-3 justify-between md:justify-start items-center mt-3">
        <div className="w-full xmd:w-[15%] md:w-[10%] lg:w-full xl:w-[15%] xmd:px-[.5em] py-[0.33em] flex justify-center items-center bg-[#1A222B] rounded-lg">
          <div
            ref={newIconToggleRef}
            className={`w-[46px] h-[46px] flex justify-center items-center bg-[#${
              newColorSelected ? newColorSelected : ex.color
            }] rounded-full cursor-pointer`}
          >
            <img
              src={newIconSelected ? newIconSelected : ex.icon}
              alt="rent"
              className="w-[30px] h-[30px]"
              onClick={() => setShowNewIconCustomize(!showNewIconCustomize)}
            />
          </div>
        </div>

        <div className="w-full md:w-[50%] lg:w-full xl:w-[50%] bg-[#1A222B] py-4 px-5 rounded-lg text-[#FFFFFF]">
          <input
            type="text"
            className="bg-transparent focus:outline-none"
            placeholder="Category Name"
            onChange={(e) => setNewCategoryName(e.currentTarget.value)}
            value={newCategoryName}
          />
        </div>

        <div className="w-full md:w-auto lg:w-full xl:w-[35%] flex items-end">
          <button
            className="w-full md:w-auto lg:w-full xl:w-auto bg-[#228B22] hover:bg-[#228835] transition-all px-4 py-4 rounded-lg cursor-pointer"
            onClick={() =>
              modifyCategory(
                ex.type,
                ex.category,
                ex,
                newCategoryName,
                newColorSelected,
                newIconSelected
              )
            }
          >
            Save Changes
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default EditCategory;
