from django.db import models

class Campaign(models.Model):
    title = models.CharField(max_length=64)
    landing_page_url = models.CharField(max_length=300)
    is_running = models.BooleanField(default=True)

class Payout(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="payouts")
    country = models.CharField(max_length=100)
    payout = models.DecimalField(max_digits=10, decimal_places=2)