import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";

import reducer from "../store";
import { addNewCategorie, deleteCategory, editCategorie, getAllCategories, selectCategories } from "../store/categoriesSlice";
import { Box, Chip, Modal, Stack, TextField, Typography ,Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CloseOutlined, ConstructionOutlined } from "@mui/icons-material";
import { useForm ,register, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
/**
 * Form Validation Schema
 */


function CategoriesContent(props) {
  const dispatch = useDispatch();
  const schema = yup.object({
    title:yup.string().required()
  })
  const  categories= useSelector(selectCategories)
  const [open,setOpen] = useState(false)
  const editRef = useRef(false)
  const handleClose = ()=>{
    setOpen(false)
    editRef.current = false
}
  const handleOpen = ()=>setOpen(true)
  const routeParams = useParams();
  const {control,handleSubmit,formState,getValues,reset,setValue} = useForm({
    mode:"onChange",
    defaultValues:{
        title:""
    },
    resolver:yupResolver(schema)
  })
  const {errors,isValid,} = formState
  const handleDelete = (id)=>{
    dispatch(deleteCategory(id))
  }
 useEffect(()=>{

    dispatch(getAllCategories())
   
 },[dispatch])

 const handleAddCategorie = ()=>{
    const {title} = getValues()
    if(editRef.current){
        dispatch(editCategorie(title)).then(()=>{
            handleClose()
            reset()
        })
        .catch(()=>{
            handleClose()
            reset()
        })
    }else{

        dispatch(addNewCategorie(title)).then(()=>{
            handleClose()
            reset()
        })
        .catch(()=>{
            handleClose()
            reset()
        })
    }
  
 }
    const handleEditCategory = (id,name)=>{
        setValue("title",name)
        editRef.current = true
        handleOpen()
    }

  return (
    <>
    

    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-col flex-1 items-center  h-full"
        >
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className="bg-white w-fit h-fit absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-14 rounded-[10px] flex flex-col min-w-[30vw] gap-14">
           <Stack direction="row">
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Nouvelle Categorie
            </Typography>
              <Button sx={{width:"50px",marginLeft:"auto"}} onClick={()=>handleClose()}><CloseOutlined/></Button>
           </Stack>
          
           <form onSubmit={handleSubmit(handleAddCategorie)}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.title?.message}
                        label="categorie de produit"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                 />
            )}
        />
                <Stack direction="row" className="justify-center w-fit gap-14 mt-14">
                    <Button variant="contained" type='submit'>{editRef.current?"Edit":"Add"}</Button>
                    <Button variant="contained" onClick={()=>handleClose()}>Annuler</Button>
                </Stack>
            </form>
         
          
        </div>
    </Modal>
 
     <div className="flex flex-wrap border-spacing-16 border-red-700 p-32 gap-10 w-full ">
        {
               categories?.map((cat,index)=>{
                return (
                    <Chip key={cat.id}  label={cat.name} variant="outlined"  onClick={()=>handleEditCategory(cat.id,cat.name)} onDelete={()=>handleDelete(cat.id)} />
                )
            })
        }
        <Chip  icon={<AddCircleOutlineIcon />}  label="add category" variant="outlined" onClick={()=>handleOpen()} />
       
     </div>

 
  </motion.div> 
  </>
  )
}

export default withReducer("eCommerceApp", reducer)(CategoriesContent);
