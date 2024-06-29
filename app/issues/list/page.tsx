import Pagination from "@/app/components/Pagination";
import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueAction from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

interface PropsType {
  searchParams: IssueQuery;
}
const IssuePage = async ({ searchParams }: PropsType) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const PageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * PageSize,
    take: PageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex className="text-black" direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={PageSize}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default IssuePage;
