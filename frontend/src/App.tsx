import './App.css';
import { useState, useEffect } from 'react'
import { Card, Table } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { Switch } from '@mantine/core';
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export interface Payout {
  id?: number;
  country: string;
  payout: number;
}

export interface Campaign {
  id?: number;
  title: string;
  landing_page_url: string;
  is_running: boolean;
  payouts: Payout[];
}

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const apiUrl = 'http://localhost:8000/api';

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${apiUrl}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchItems();
  }, []);

  const renderRows = () => {
    return campaigns.map((campaign) => (
      <Table.Tr key={campaign.id}>
        <Table.Td>{campaign.title}</Table.Td>
        <Table.Td>{campaign.landing_page_url}</Table.Td>
        <Table.Td>
          {campaign.payouts.map(payout => 
            `${payout.country}: ${payout.payout}`
          ).join(', ')}
        </Table.Td>
        <Table.Td>
          <Switch defaultChecked={campaign.is_running} color="green" />
        </Table.Td>
        <Table.Td>  
          <ActionIcon color="red" variant="filled" aria-label="Delete">
            <IconTrash size="1.2rem" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <Tabs color="teal" defaultValue="campaign" className="tab">
      <Tabs.List>
        <Tabs.Tab value="campaign" className="tab-btn">Campaigns</Tabs.Tab>
        <Tabs.Tab value="addCampaing" className="tab-btn">New campaign</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="campaign" pt="xs">
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
      </Tabs.Panel>

      <Tabs.Panel className="card-pannel" value="addCampaing" pt="xs">
        <Card className="card" withBorder shadow="sm" radius="md">
          <div>
            <TextInput
              label="Name"
              placeholder="Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              mt="md"
              label="Email"
              placeholder="Email"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <Group justify="center" mt="xl">
              <Button
                onClick={() =>
                  form.setValues({
                    name: randomId(),
                    email: `${randomId()}@test.com`,
                  })
                }
              >
                Set random values
              </Button>
            </Group>
          </div>
        </Card>
      </Tabs.Panel>
    </Tabs>
  );
}

export default App;