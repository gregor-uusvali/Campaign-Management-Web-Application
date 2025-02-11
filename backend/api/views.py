from django.shortcuts import render
from django.http import JsonResponse
from .models import Campaign, Payout
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view

class PayoutSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = ['country', 'payout']

class CampaignSerializer(serializers.ModelSerializer):
    payouts = PayoutSerialzer(many=True)

    class Meta:
        model = Campaign
        fields = ['id', 'title', 'landing_page_url', 'is_running', 'payouts']

    def create(self, validated_data):
        payouts_data = validated_data.pop('payouts')
        campaign = Campaign.objects.create(**validated_data)  # Create Campaign

        # Create Payouts linked to the campaign
        for payout_data in payouts_data:
            Payout.objects.create(campaign=campaign, **payout_data)

        return campaign

@api_view(['GET'])
def getCampaings(request):
    campaigns = Campaign.objects.all()
    serializer = CampaignSerializer(campaigns, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addCampaing(request):
    serializer = CampaignSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def toggleActive(request):
    campaign_id = request.data.get("id")
    try:
        campaign = Campaign.objects.get(pk=campaign_id)
        campaign.is_running = 0 if campaign.is_running else 1
        campaign.save()
        return Response({"response": f"Campaign {"activated" if campaign.is_running else "deactivate"}"})
    except Campaign.DoesNotExist:
        return Response({"error": "Invalid id"})
    
