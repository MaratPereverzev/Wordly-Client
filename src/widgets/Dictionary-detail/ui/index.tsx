import { DictionaryInstance } from "@/shared/api/dictionary/model"
import { WordInstance } from "@/shared/api/word/model"
import { BasicTable, ButtonIcon } from "@/shared/ui"
import { dispatchEvent } from "@/shared/utils"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { JSX } from "react"
import { DeleteWordDialog } from "./modal-content/delete-word"

type DictionaryDetailTableParams = {
  data: DictionaryInstance
}

const columnHelper = createColumnHelper<WordInstance>();

const columns = [
  columnHelper.accessor("id", {header: "Id", cell: ({getValue}) => getValue()}),
  columnHelper.accessor("caption", {header: "Word", cell: ({getValue}) => getValue()}),
  columnHelper.accessor("description", {header: "Translation", cell: ({getValue}) => getValue()}),
  columnHelper.accessor("createdAt", {header: "Created At", cell: ({getValue}) => new Date(getValue()).toLocaleDateString()}),
  columnHelper.display({id: "actions", cell: ({row}) => <ButtonIcon icon="delete" onClick={() => {
    dispatchEvent<{dialogContent: JSX.Element}>("onOpenDialog", {dialogContent: <DeleteWordDialog id={row.getValue("id")}/>})
  }}/>})
]

export const DictionaryDetailTable = ({data}: DictionaryDetailTableParams) => {
  const table = useReactTable<WordInstance>({data: data.words, columns, getCoreRowModel: getCoreRowModel()});

  return <BasicTable
    bodyRows={table.getRowModel().rows}
    headRows={table.getHeaderGroups()[0].headers}
  />
}