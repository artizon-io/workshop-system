import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Root as DialogRoot } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';
import Dialog from '@components/dialog';
import DialogHeader from '@components/dialog/dialogHeader';
import DialogFooter from '@components/dialog/dialogFooter';
import { useFormik } from 'formik';
import { WorkshopConfidential, WorkshopSchema } from '@mingsumsze/common';
import Logger from 'js-logger';
import { Input } from '@components/input';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import MockData from "@assets/workshopEnrollMockData.json";


// TODO: refactor add/edit dialog

// vite already transform json to obj for us
const mockData = MockData as WorkshopConfidential['enrolls'];
Logger.debug(mockData[0]);

const columnHelper = createColumnHelper<WorkshopConfidential['enrolls'][number]>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('stripePaymentId', {
    header: 'Stripe Payment ID',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone Number',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('paymentStatus', {
    header: 'Payment Status',
    footer: info => info.column.id,
  }),
];

const StyledEnrollTable = styled('div', {
  overflow: 'scroll',
  backgroundColor: 'inherit',

  '& > table': {
    backgroundColor: 'inherit',
    // 0" cellpadding="0"
  }
});

const StyledTableHead = styled('thead', {
  position: 'sticky',
  top: 0,
  backgroundColor: 'inherit',

  '& > tr > th': {
    padding: '15px 10px',
    fontFamily: '$firacode',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 300,
  }
});

const StyledTableBody = styled('tbody', {
  '& > tr:nth-child(odd)': {
    backgroundColor: '$gray900',
  },
  '& > tr:nth-child(even)': {
    backgroundColor: '$gray850',
  },

  '& > tr > td': {
    fontSize: '13px',
    color: '$gray400',
    fontFamily: '$inter',
    fontWeight: 300,

    padding: '15px 10px',
    borderBottom: '2px solid transparent',
    borderColor: '$gray950'
  }
});

const EnrollTable : React.FC = ({ ...props }) => {
  const table = useReactTable<WorkshopConfidential['enrolls'][number]>({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <StyledEnrollTable>
      {/* Remove "border" */}
      <table cellSpacing={0} cellPadding={0}>
        <StyledTableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </StyledTableHead>
        <StyledTableBody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </StyledTableBody>
      </table>
    </StyledEnrollTable>
  );
}

const StyledInfoDialog = styled(Dialog, {
  
});

interface Props extends React.ComponentProps<typeof StyledInfoDialog> {
  close: () => void;
};

const InfoDialog: React.FC<{
  close: () => void;
} & React.ComponentProps<typeof StyledInfoDialog>> = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <StyledInfoDialog {...props} ref={ref} spacing={'compact'}>
      <DialogHeader>Workshop Info</DialogHeader>
      <EnrollTable/>
      <DialogFooter>
        <Button onClick={() => close()} size="s">Close</Button>
      </DialogFooter>
    </StyledInfoDialog>
  )
});

export default InfoDialog;