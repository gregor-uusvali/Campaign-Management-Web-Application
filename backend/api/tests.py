from django.test import TestCase
from .models import Campaign, Payout

class CampaignTest(TestCase):

    def testCreate(self):
        campaign = Campaign.objects.create(title="test", landing_page_url="test.com")

        saved_campaign = Campaign.objects.get(id=campaign.id)

        self.assertEqual(saved_campaign.title, "test")
        self.assertTrue(saved_campaign.is_running)