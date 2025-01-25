import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { deleteData } from '../others/api';
import toastSuccess from './Alert';
import { useNavigate } from 'react-router-dom';

export default function DropdownForCustomer({id, setRefresh, refresh, api, show}) {

  const navigate=useNavigate()

    const deleteItem = (id) => {
        deleteData(`/${api}/${id}`) // Replace `/items/${id}` with your API endpoint
          .then(() => {
            setRefresh(!refresh)
            toastSuccess("Successfully deleted")

          });
      };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem
        onClick={()=>navigate(show)}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{' '}
          Show
        </MenuItem> 

        <ListDivider />
        <MenuItem variant="soft" color="danger" onClick={()=>deleteItem(id)}>
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>{' '}
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
