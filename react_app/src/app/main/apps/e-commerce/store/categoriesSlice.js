import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import API from 'src/API';

const categoriesAdapter = createEntityAdapter({});

export const getAllCategories = createAsyncThunk(
    'categories/get-categories',
    async ()=>{
        const categories = await API.fetchProductCategories(false);
        return categories
    }
)
export const addNewCategorie = createAsyncThunk(
    "categories/add-category",
    async (title)=>{
         return await API.addNewCategorie(title);
    }
)
export const editCategorie = createAsyncThunk(
    "categories/edit-category",
    async ({id,title})=>{
         return await API.editCategory(id,title);
    }
)

export const deleteCategory = createAsyncThunk(
    "categories/delete-category",
    async (id)=>{
         await API.removeCategory(id);
        return id
    }
)
const categoriesSlice = createSlice({
    name:'categories',
    initialState:[],
    reducers:{
        includesCategoryText:(state,action)=>{
            console.log(action.payload)
            state  = state.filter(el=> el.name.includes(action.payload))
            return state
        }
    },
    extraReducers:(builder=>{
        builder
        .addCase(getAllCategories.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(addNewCategorie.fulfilled,(state,action)=>{
            state = [...state,action.payload]
            return state;
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state = state.filter(cat=>cat.id !== action.payload)
            return state;
        })
        .addCase(editCategorie.fulfilled,(state,action)=>{
            const index = state.findIndex(c=>c.id === action.payload.id) 
            state[index].name = action.payload.name;
            return state;

        })
    })
    
   
})


export const selectCategories = ({ eCommerceApp }) => eCommerceApp.categories;

export const {includesCategoryText} = categoriesSlice.actions
export default categoriesSlice.reducer;
