import { Switch, ActionIcon, Input, NativeSelect } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { apiUrl, Campaign } from "../App";
import { Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface TableComponentProps {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}

const TableComponent = ({ campaigns, setCampaigns }: TableComponentProps) => {
  const [filter, setFilter] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const fetchCampaign = async (filter?: string, value?: string) => {
    try {
      const response = await fetch(
        `${
          apiUrl +
          (filter ? `?filter=${filter}` : "") +
          (value ? `&search=${value}` : "")
        }`
      );
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setCampaigns(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const toggleIsRunning = async (id?: number) => {
    if (!id) return;
    try {
      const response = await fetch(`${apiUrl}/toggle/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) throw new Error("Error");
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === id
            ? { ...campaign, is_running: !campaign.is_running }
            : campaign
        )
      );
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  const deleteCampaign = async (id?: number) => {
    try {
      const response = await fetch(`${apiUrl}/delete/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) throw new Error("Error");
      setCampaigns(campaigns.filter((c) => !(c.id === id)));
      notifications.show({
        message: "Campaign deleted!",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  const renderRows = () => {
    return campaigns.map((campaign) => (
      <Table.Tr key={campaign.id}>
        <Table.Td>{campaign.title}</Table.Td>
        <Table.Td>{campaign.landing_page_url}</Table.Td>
        <Table.Td>
          {campaign.payouts
            .map((payout) => `${payout.country}: ${payout.payout}`)
            .join(", ")}
        </Table.Td>
        <Table.Td>
          <Switch
            onChange={(e) => toggleIsRunning(campaign.id)}
            defaultChecked={campaign.is_running}
            color="green"
          />
        </Table.Td>
        <Table.Td>
          <ActionIcon
            onClick={() => deleteCampaign(campaign.id)}
            color="red"
            variant="filled"
            aria-label="Delete"
          >
            <IconTrash size="1.2rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };

  useEffect(() => {
    fetchCampaign();
  }, [setCampaigns]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchCampaign(filter, debouncedTerm);
  }, [debouncedTerm, filter]);

  return (
    <>
      <div className="search">
        <NativeSelect
          className="search-select"
          value={filter}
          onChange={(event) => setFilter(event.currentTarget.value)}
          data={[
            { label: "Title", value: "title" },
            { label: "Landing Page URL", value: "landing_page_url" },
            { label: "Is Running", value: "is_running" },
          ]}
        />
        <Input
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
          m="md"
          placeholder="Search"
        />
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>URL</Table.Th>
            <Table.Th>Payouts</Table.Th>
            <Table.Th>Active</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderRows()}</Table.Tbody>
      </Table>
    </>
  );
};

export default TableComponent;
