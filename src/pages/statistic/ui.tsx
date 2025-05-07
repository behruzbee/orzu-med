import HotTable, { HotColumn, HotTableRef } from "@handsontable/react-wrapper"
import { Box, Card, Flex, LoadingOverlay, Overlay, Pagination, ScrollArea, Title } from "@mantine/core"
import { useGetMarketsQuery } from "entities/markets";
import { useEffect, useRef, useState } from "react";
import { сheckPermissions } from "shared/helpers/check-permissions"
import { START_DATA } from "shared/constants/table";
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

  const data = markets.map((market) => {
    const currentTable = market.tables?.[activePage - 1]
    if (currentTable) {
      // @ts-ignore
      const marketData = currentTable.data.rows.map((row, idx) => {
        // @ts-ignore
        const data = row.map(item => typeof item === "number" ? item : 0)
        // @ts-ignore
        const sum = data.reduce((acc, curr) => acc + curr, 0)
        return sum
      })
      return marketData
    }
    return []
  })


  const dateHeaders = markets.map((market) => market.name)


  const endData = START_DATA.map((cell, idx) => {
    const currentCell = data.map(cell => Math.floor(cell[idx]))
    const totalCell = currentCell.reduce((acc, curr) => Math.floor(acc + curr), 0)
    const newCell = [...cell, ...currentCell, Math.floor(totalCell), 0, Math.floor(totalCell / markets.length)]
    return newCell
  })

  // @ts-ignore
  const currentTable = markets[0].tables[activePage - 1]

  return (
    <ScrollArea>
      {сheckPermissions() || <Overlay color="#000" backgroundOpacity={0.2} blur={12} />}
      {/* <WeeklyPage /> */}
      <Flex mt="lg" justify="space-between" align="center" mb="md">
        {/* @ts-ignore */}
        {currentTable && <Title order={2}>Отчет по  {new Date(currentTable.data?.date).toLocaleDateString('ru-RU', {
          month: '2-digit',
          year: 'numeric'
        })}</Title>}
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
          <Pagination total={markets[0].tables?.length || 1} value={activePage} onChange={setPage} mt="sm"></Pagination>
        </Box>
        {/* <Title order={2}>Статистика</Title> */}
        {/*  <AreaChart
          h={300}
          data={chartData}
          dataKey="date"
          series={dateHeaders.map((name, idx) => ({
            name,
            color: ["blue", "cyan", "grape", "green", "orange", "red", "indigo", "pink"][idx]
          }))}
          curveType="linear"
          tickLine="xy"
          gridAxis="xy"
        />
 */}
      </Card >

    </ScrollArea>
  )
}

export default StatisticPage