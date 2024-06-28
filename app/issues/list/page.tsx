import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { IssueStatusBadge, Link } from "../../components";
import IssueAction from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
interface PropsType {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}
const IssuePage = async ({ searchParams }: PropsType) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Column",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
    <div className="text-black">
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeaderCell key={index} className={column.className}>
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        pageSize={PageSize}
        currentPage={page}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssuePage;
