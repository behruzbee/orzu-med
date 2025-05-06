import { HotColumn, HotTable, HotTableRef } from '@handsontable/react-wrapper';
import { Box, Button, Card, Flex, LoadingOverlay, Overlay, Pagination, Title } from '@mantine/core';
import { IconArrowRight, IconMinus, IconPhoto, IconPlus } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { getAllThursdaysOfMonth } from 'shared/helpers/get-all-thursdays-of-month';
import { useEffect, useRef, useState } from 'react';
import { сheckPermissions } from 'shared/helpers/check-permissions';
import { useGetMarketQuery } from 'entities/markets';
import { START_DATA } from 'shared/constants/table';
import { useCreateTableQuery } from 'entities/tables';
import { useDeleteTableQuery, useUpdateTableQuery } from 'entities/tables/api/query';

const BranchPage = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [activePage, setPage] = useState(1);
  const { marketId } = useParams<{ marketId: string }>();
  const hotRef = useRef<HotTableRef>(null);
  const { data: market } = useGetMarketQuery(marketId || "")
  const { mutate: createTable, isPending: createPending } = useCreateTableQuery()
  const { mutate: updateTable, isPending: updatePending } = useUpdateTableQuery()
  const { mutate: deleteTable, isPending: deletePending } = useDeleteTableQuery()

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  if (!market || market.tables === undefined) {
    return <LoadingOverlay visible={true} />;
  }

  const formattedBranch = market.name
    ?.split("")
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join("");

  // @ts-ignore
  const dateHeaders = getAllThursdaysOfMonth(new Date(market.tables[activePage - 1].createAt).getFullYear(), new Date(market.tables[activePage - 1].createAt).getMonth())

  const handleCreateTable = (data: any) => {
    const hotInstance = hotRef.current?.hotInstance;
    if (!hotInstance) return;

    const rowData = hotInstance.getData();
    const colHeaders = hotInstance.getColHeader();
    const nestedHeaders = hotInstance.getSettings().nestedHeaders;

    const payload = {
      branch: formattedBranch,
      nestedHeaders,
      colHeaders,
      rows: data || rowData,
      date: new Date()
    };

    createTable({
      data: payload,
      // @ts-ignore
      marketId: market.id
    }, { onSuccess: () => setHasChanges(false) })
  };

  const handleUpdateTable = () => {
    const hotInstance = hotRef.current?.hotInstance;
    if (!hotInstance) return;

    const rowData = hotInstance.getData();
    const colHeaders = hotInstance.getColHeader();
    const nestedHeaders = hotInstance.getSettings().nestedHeaders;

    const payload = {
      branch: formattedBranch,
      nestedHeaders,
      colHeaders,
      rows: rowData,
      date: new Date()
    };

    updateTable({
      data: payload,
      // @ts-ignore
      id: market.tables[activePage - 1].id,
      // @ts-ignore
      marketId: market.id
    })
  };

  function handleDeleteTable() {
    if (confirm("Вы уверены, что хотите удалить эту таблицу?")) {
      // @ts-ignore
      deleteTable(market.tables[activePage - 1].id);
    }
  }

  if (activePage > market.tables.length && activePage > 1) {
    setPage(1)
  }

  return (
    <>
      {сheckPermissions(market.name) || <Overlay color="#000" backgroundOpacity={0.2} blur={12} />}
      <Flex justify="space-between" align="center" mb="md">
        <Title order={2}>Отчет по {formattedBranch}</Title>
        <Flex columnGap="sm">
          {сheckPermissions("delete") && <Button loading={updatePending} onClick={() => handleDeleteTable()} color='red' size='sm' rightSection={<IconMinus />}>Удалить таблицу </Button>}
          <Button loading={createPending} onClick={() => handleCreateTable(START_DATA)} color='green' size='sm' rightSection={<IconPlus />}>Создать таблицу </Button>
        </Flex>
      </Flex>
      <Card maw="98%" shadow="sm" padding="lg" radius="md" withBorder>
        <Box style={{ zIndex: market.tables.length > 0 ? 1 : -100 }}>
          <HotTable
            ref={hotRef}
            // @ts-ignore
            data={market.tables[activePage - 1]?.data?.rows || []}
            width="100%"
            height={600}
            colWidths={[70, 240, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120]}
            fixedColumnsLeft={2}
            nestedHeaders={[
              [
                { label: "Название статистики", colspan: 2 },
                { label: "Даты", colspan: dateHeaders.length },
              ],
              ["№", "Название", ...dateHeaders]
            ]}
            dropdownMenu={true}
            hiddenColumns={{ indicators: true }}
            contextMenu={true}
            multiColumnSorting={true}
            filters={true}
            rowHeaders={true}
            headerClassName="htCenter"
            manualRowMove={true}
            autoWrapRow={true}
            className="htCenter"
            licenseKey="non-commercial-and-evaluation"
            cells={(cell, col) => {
              const obj: any = {}

              if (col < 2) {
                obj.readOnly = true
                obj.className = "yellow-cell"
              }
              else {
                obj.className = "gray-cell"
              }
              if (col == 1 && cell === 4) {
                obj.className = "green-cell"
              } else if (col == 0 && cell === 4) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 5) {
                obj.className = "red-cell"
              }
              else if (col == 0 && cell === 5) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 8) {
                obj.className = "green-cell"
              }
              else if (col == 0 && cell === 8) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 9) {
                obj.className = "red-cell"
              }
              else if (col == 0 && cell === 9) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 15) {
                obj.className = "green-cell"
              }
              else if (col == 0 && cell === 15) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 16) {
                obj.className = "red-cell"
              }
              else if (col == 0 && cell === 16) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 24) {
                obj.className = "green-cell"
              }
              else if (col == 0 && cell === 24) {
                obj.className = "teal-cell"
              }
              if (col == 1 && cell === 25) {
                obj.className = "red-cell"
              }
              else if (col == 0 && cell === 25) {
                obj.className = "teal-cell"
              }

              return obj
            }}
            afterChange={(_, source) => {
              if (source !== 'loadData') {
                setHasChanges(true);
              }
            }}
          >
            <HotColumn />
            <HotColumn />
            {dateHeaders.map((_, index) => (
              <HotColumn key={index} type="numeric" readOnly={false} />
            ))}
          </HotTable>
          <Button
            variant="light"
            size='md'
            mt="md"
            leftSection={<IconPhoto size={14} />}
            rightSection={<IconArrowRight size={14} />}
            onClick={handleUpdateTable}
            loading={updatePending}
          >
            Cохранить отчет
          </Button>
          <Pagination total={market.tables?.length || 0} value={activePage} onChange={setPage} mt="sm"></Pagination>
        </Box>
      </Card >
    </>
  );
};

export default BranchPage;
