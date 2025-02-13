import {
  Card,
  TextInput,
  Group,
  Button,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { apiUrl, Campaign } from "../App";
import { notifications } from "@mantine/notifications";

interface FormComponentProps {
  onCampaignCreated: (campaign: Campaign) => void;
}

const FormComponent = ({ onCampaignCreated }: FormComponentProps) => {
  const form = useForm({
    initialValues: {
      title: "",
      landing_page_url: "",
      payouts: [{ country: "", payout: 0 }],
    },
    validate: {
      title: (value) =>
        value.trim().length > 0 && value.trim().length <= 64
          ? null
          : "Title is required (max 64 characters)",

      landing_page_url: (value) =>
        value.trim().length > 0 && value.trim().length <= 300
          ? null
          : "Landing Page URL is required (max 300 characters)",

      payouts: {
        country: (value) =>
          value.trim().length > 0 && value.trim().length <= 100
            ? null
            : "Country is required (max 100 characters)",

        payout: (value) => (value > 0 ? null : "Payout must be greater than 0"),
      },
    },
  });

  const addPayoutField = () => {
    if (form.values.payouts.length < 10) {
      form.insertListItem("payouts", { country: "", payout: 0 });
    }
  };

  const rmPayoutField = (index: number) => {
    form.removeListItem("payouts", index);
  };

  const createCampaign = async () => {
    if (!form.validate().hasErrors) {
      try {
        const response = await fetch(`${apiUrl}/add/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.values),
        });
        if (!response.ok) {
          throw new Error("Error creating campaign");
        }

        const newCampaign = await response.json();
        onCampaignCreated(newCampaign);
        form.reset();
        notifications.show({
          message: "Campaign created successfully!",
          autoClose: 3000,
        });
      } catch (err) {
        console.error("Error creating campaign:", err);
      }
    }
  };

  return (
    <Card className="card" withBorder shadow="sm" radius="md">
      <div>
        <TextInput
          required
          label="Title"
          placeholder="Title"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <TextInput
          required
          mt="md"
          label="Landing Page URL"
          placeholder="Landing Page URL"
          key={form.key("landing_page_url")}
          {...form.getInputProps("landing_page_url")}
        />
        {form.values.payouts.map((_, index) => (
          <div key={index} className="payout-field">
            <TextInput
              required
              className="payout-textfield"
              mt="md"
              label="Payout Country"
              placeholder="Payout Country"
              {...form.getInputProps(`payouts.${index}.country`)}
            />
            <NumberInput
              required
              min={0.01}
              step={0.01}
              mt="md"
              label="Amount"
              placeholder="Amount"
              {...form.getInputProps(`payouts.${index}.payout`)}
            />
            {index !== 0 ? (
              <ActionIcon
                className="minus-btn"
                onClick={() => rmPayoutField(index)}
                variant="filled"
                aria-label="Delete"
              >
                <IconMinus size="1.2rem" />
              </ActionIcon>
            ) : null}
          </div>
        ))}

        <ActionIcon
          onClick={addPayoutField}
          mt="md"
          variant="filled"
          aria-label="Delete"
        >
          <IconPlus size="1.2rem" />
        </ActionIcon>

        <Group justify="center" mt="md">
          <Button onClick={() => createCampaign()}>Create campaign</Button>
        </Group>
      </div>
    </Card>
  );
};

export default FormComponent;
