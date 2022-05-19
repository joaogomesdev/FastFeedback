import React from "react";
import NextLink from "next/link";
import { format, parseISO } from "date-fns";
import { Box, Link } from "@chakra-ui/react";

import { Table, Tr, Th, Td } from "./Table";

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>
              <Link href={site.link} isExternal>
                {site.link}
              </Link>
            </Td>
            <Td>
              <NextLink href={`/p/[siteId]`} as={`/p/${site.id}`} passHref>
                <Link color="blue.400" fontWeight="bold">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.created_at), "PPpp")}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
