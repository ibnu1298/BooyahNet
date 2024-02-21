"use client";
import React, {
  ChangeEvent,
  SVGProps,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import ModalPaymentACC from "../Modal/ModalPaymentACC";
import ModalPreviewImage from "../Modal/ModalPreviewImage";
import SelectOption from "@/components/Elements/Input/Select/SelectOption";
import ModalPaymentACCNotif from "../Modal/ModalPaymentACCNotif";

const statusColorMap: Record<string, ChipProps["color"]> = {
  2: "success",
  1: "warning",
  0: "danger",
};
const rowPerPage = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "tanggal", "status", "actions"];
export default function TablePaymentACC({ payments }: { payments: any }) {
  let selectedPaymentPrice: any = [];
  let notPendingPaymentId: any = [];
  let pendingPaymentId: any = [];
  const [filterValue, setFilterValue] = useState("");
  const [showModal, setShowModal] = useState("hidden");
  const [showImage, setShowImage] = useState("hidden");
  const [payment, setPayment] = useState(null);
  const [showModalNotif, setShowModalNotif] = useState("hidden");
  const [srcImage, setSrcImage] = useState("/images/people/cat.jpg");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [statusFilter, setStatusFilter] = useState<Selection>(
    new Set(["1", "0"])
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  payments.map(
    (payment: any) =>
      payment.status != 1 && notPendingPaymentId.push(payment.id.toString())
  );
  payments.map(
    (payment: any) =>
      payment.status == 1 && pendingPaymentId.push(payment.id.toString())
  );

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredPayments = [...payments];

    if (hasSearchFilter) {
      filteredPayments = filteredPayments.filter((payment) =>
        payment.user.firstName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredPayments = filteredPayments.filter((payment) =>
        Array.from(statusFilter).includes(payment.status.toString())
      );
    }

    return filteredPayments;
  }, [payments, filterValue, statusFilter, hasSearchFilter]);

  let selectedPaymentId = Array.from(selectedKeys);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  if (selectedPaymentId.join().replace(/,/g, "") == "all") {
    selectedPaymentId.splice(0, 3);
    filteredItems.map(
      (payment: any) =>
        payment.status == 1 && selectedPaymentId.push(payment.id)
    );
  } else {
    filteredItems.map(
      (payment: any) =>
        payment.id == selectedPaymentId.values() &&
        selectedPaymentPrice.push(payment.pricePayment)
    );
  }

  const renderCell = useCallback(
    (payment: any, columnKey: any) => {
      const cellValue = payment[columnKey as keyof any];
      function actionRow(key: string) {
        let image = "/images/people/default.jpg";
        switch (key) {
          case "view":
            if (showImage == "hidden") {
              setShowImage("");
              image = payment.urlImage != null ? payment.urlImage : image;
              setSrcImage(image);
              setPayment(payment);
            } else {
              setShowImage("hidden");
            }
        }
      }
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col w-16 text-white">
              <span>
                {payment.user.firstName} {payment.user.lastName}
              </span>
              <span className="text-xs font-thin ">
                {payment.user.userName}
              </span>
            </div>
          );

        case "tanggal":
          return (
            <div className="w-36 text-white">{payment.billingDateDesc}</div>
          );

        case "status":
          return (
            <Chip
              className="capitalize px-2"
              color={statusColorMap[payment.status]}
              size="sm"
              variant="flat"
            >
              {payment.statusDesc}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key) => actionRow(key.toString())}>
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [showImage]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const PaymentModal = () => {
    if (selectedPaymentId.length <= 0) {
      alert("Silahkan Pilih Payment");
    }
    if (showModal == "hidden" && selectedPaymentId.length > 0) {
      setShowModal("");
    } else {
      setShowModal("hidden");
    }
  };

  function PaymentNotifModal() {
    console.log("test");

    if (showModalNotif == "hidden") {
      setShowModalNotif("");
    } else {
      setShowModalNotif("hidden");
    }
  }
  const imageModal = (image: string) => {
    if (showImage == "hidden") {
      setShowImage("");
      image = image != null ? image : "/images/people/default.jpg";
      setSrcImage(image);
    } else {
      setShowImage("hidden");
    }
  };
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] "
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "border-0 focus:ring-0",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
          />
          <div className="flex gap-3 ">
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status: any) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column: any) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {payments.length} Riwayat Pembayaran
          </span>

          <label className="flex items-center bg-gray-500/50 text-white text-small border-1 border-gray-500 rounded-xl pl-4">
            Rows per page :
            <SelectOption
              width="w-fit"
              defaultValue={["5"]}
              className="bg-transparent outline-none w-16 text-small border-0 focus:ring-0 text-white "
              data={rowPerPage}
              onChange={onRowsPerPageChange}
            />
          </label>
        </div>
      </div>
    );
  }, [
    onClear,
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    payments.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-fit text-small text-default-400">
          {pendingPaymentId.length > 0 ? (
            <>
              {selectedKeys === "all"
                ? `${selectedPaymentId.length} of ${pendingPaymentId.length} selected`
                : `${selectedKeys.size} of ${pendingPaymentId.length} selected`}
            </>
          ) : (
            <>Pending Payment Not Found</>
          )}
        </span>
        {sortedItems.length > 0 && (
          <Pagination
            hidden={pages == 1}
            className="z-0"
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        )}
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    pendingPaymentId.length,
    selectedPaymentId.length,
  ]);

  const handleSelectUser = (payment: any) => {
    console.log(payment);
  };

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        color="success"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[370px]  bg-gray-900/80 backdrop-blur-[3px] ",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        disabledKeys={notPendingPaymentId}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="md:w-fit"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Payments found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id} onClick={() => handleSelectUser(item)}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <>
        <ModalPaymentACCNotif
          payments={filteredItems}
          show={showModalNotif}
          paymentId={selectedPaymentId}
          showModal={() => PaymentNotifModal()}
        />
        {selectedPaymentId.length > 0 && (
          <>
            {showModal == "" ? (
              <ModalPaymentACC
                payments={filteredItems}
                show={showModal}
                paymentId={selectedPaymentId}
                showModal={() => PaymentModal()}
                showModalNotif={() => PaymentNotifModal()}
              />
            ) : (
              <a onClick={() => PaymentModal()}>
                <div className="z-50 animate-bounce animate-infinite animate-ease-linear animate-fill-forwards fixed bottom-8 end-5 md:start-5  text-white w-fit  dark:bg-teal-500/70 rounded-full px-4 text-center sm:px-5 py-1.5 cursor-pointer">
                  ACC Payment
                </div>
              </a>
            )}
          </>
        )}
        <ModalPreviewImage
          showModal={imageModal}
          show={showImage}
          src={srcImage}
          payment={payment}
          ACC={true}
          showModalNotif={PaymentNotifModal}
        />
      </>
    </>
  );
}

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "TANGGAL", uid: "tanggal", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Lunas", uid: "2" },
  { name: "Pending", uid: "1" },
  { name: "Belum Dibayar", uid: "0" },
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const PlusIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);
