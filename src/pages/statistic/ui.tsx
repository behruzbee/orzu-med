import HotTable, { HotColumn, HotTableRef } from "@handsontable/react-wrapper"
import { Box, Card, Flex, LoadingOverlay, Overlay, Pagination, ScrollArea, Title } from "@mantine/core"
import { useGetMarketsQuery } from "entities/markets";
import { useEffect, useRef, useState } from "react";
import { сheckPermissions } from "shared/helpers/check-permissions"
import { START_DATA } from "shared/constants/table";
import { getAllThursdaysOfMonth } from "shared/helpers/get-all-thursdays-of-month";
import { bb12, collectGroupedByPosition } from "shared/helpers/splitter";
// import { WeeklyPage } from "pages/weekly-page";

const StatisticPage = () => {
  const [hasChanges] = useState(false);
  const [activePage, setPage] = useState(1);
  const hotRef = useRef<HotTableRef>(null);
  const { data: markets } = useGetMarketsQuery()

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

  if (!markets) {
    return <LoadingOverlay visible={true} />;
  }

  // @ts-ignore
  const weeks = markets[0].tables.map((market, idx) => {
    // @ts-ignore
    return getAllThursdaysOfMonth(new Date(market.createdAt).getFullYear(), new Date(market.createdAt).getMonth())
  })

  const combined = weeks.flat()

  const bb1 = markets.map((market) => {
    return market.tables?.map(table => {
      return table.data.rows
    })
  })

  const res = collectGroupedByPosition(bb1)
  const res1 = bb12(res, activePage)

  const dateHeaders = markets.map((market) => market.name)

  const endData = START_DATA.map((cell, idx) => {
    const totalCell = res1[idx].reduce((acc, curr) => Math.floor(acc + curr), 0)
    const newCell = [...cell, ...res1[idx], Math.floor(totalCell), 0, Math.floor(totalCell / markets.length)]
    return newCell
  })



  return (
    <ScrollArea>
      {сheckPermissions() || <Overlay color="#000" backgroundOpacity={0.2} blur={12} />}
      {/* <WeeklyPage /> */}
      <Flex mt="lg" justify="space-between" align="center" mb="md">
        {/* @ts-ignore */}
        <Title order={2}>Отчет по  {combined[activePage - 1]}</Title>
      </Flex>
      <Card maw="98%" shadow="sm" padding="lg" radius="md" withBorder>
        <Box my="50px">
          <HotTable
            ref={hotRef}
            // @ts-ignore
            data={endData || []}
            width="100%"
            height={600}
            colWidths={[70, 240, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,]}
            fixedColumnsLeft={2}
            nestedHeaders={[
              [
                { label: "Название статистики", colspan: 2 },
                { label: "Название филиалов", colspan: dateHeaders.length },
                { label: "ЦО", colspan: 3 },
              ],
              ["№", "Название", ...dateHeaders, "Кол-во", "Процент", "Среднее"]
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
              obj.readOnly = true

              if (col > 8) {
                obj.className = "yellow-cell"
              } else {
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
          >
            <HotColumn />
            <HotColumn />
            {dateHeaders.map((_, index) => (
              <HotColumn key={index} readOnly={false} />
            ))}
            <HotColumn />
            <HotColumn />
            <HotColumn />
          </HotTable>
          <Pagination total={res[0].length} value={activePage} onChange={setPage} mt="sm"></Pagination>
        </Box>
      </Card >
    </ScrollArea>
  )
}

export default StatisticPage