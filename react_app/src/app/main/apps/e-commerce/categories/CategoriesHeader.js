import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDebounce } from '@fuse/hooks';
import { includesCategoryText } from '../store/categoriesSlice';
import { useState } from 'react';

function CategoriesHeader(props) {

    const dispatch = useDispatch()
    const [searchText,setSearchText] = useState("")


    function handleTextSearch(ev){
        setSearchText(searchText)
        dispatch(includesCategoryText(ev.target.value))
    }
//   const dispatch = useDispatch();
//   const searchText = useSelector(selectOrdersSearchText);

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="flex text-24 md:text-32 font-extrabold tracking-tight"
      >
        Categories
      </Typography>
      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search Category"
            className="flex flex-1"
            disableUnderline
            value={searchText}
            fullWidth
            inputProps={{
              'aria-label': 'Search Category',
            }}
            onChange={(ev) => handleTextSearch(ev)}
          />
        </Paper>
      </div>
    </div>
  );
}

export default CategoriesHeader;
