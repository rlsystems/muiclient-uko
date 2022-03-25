import { useState } from "react";
import FlexBox from "../../components/FlexBox";
import { H6, Small, Tiny } from "../../components/Typography";
import UkoAvatar from "../../components/UkoAvatar";
import EditIconButton from "../../components/EditIconButton";

const VenueColumnShape = [
  {
    Header: "Name",
    accessor: "name",
    minWidth: 200,
    Cell: ({ row }: any) => {

      const { name } = row.original;
      return (
        <H6 color="text.primary"
          sx={{textTransform: "capitalize"}}
        >{name}</H6>
      );
    },
  },
  {
    Header: "Description",
    accessor: "description",
    minWidth: 200,   
  },
  {
    Header: "Guid",
    accessor: "id",
    minWidth: 150,
  },
 
  {
    Header: "Edit",
    accessor: "action",
    Cell: ({ row }: any) => {

      return (
        <>
          <EditIconButton onClick={() => console.log('edit')} />


        </>
      );
    },
  },
];

export default VenueColumnShape;
