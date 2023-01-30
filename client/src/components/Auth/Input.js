import React from 'react'
import { TextField,Grid,InputAdornment,IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({half,name,handleChange,label,autoFocus,type,handleShowButton}) => {
  return (
        <Grid item cs={12} sm={half?6:12} >
          <TextField
            name={name}
            label={label}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            autoFocus={autoFocus}
            type={type}
            InputProps={name==='password'?{
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton  onClick={handleShowButton}>
                          {type==='password'?<VisibilityIcon /> :<VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                )
            }:null}
          />
        </Grid>
    )
}

export default Input

