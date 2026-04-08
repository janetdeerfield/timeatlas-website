#!/usr/bin/env bash

# Google Analytics & AdSense Setup Verification
# Run this script to verify your analytics setup

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}TimeAtlas Analytics Setup Verification${NC}"
echo -e "${BLUE}================================================${NC}\n"

# Check .env.local exists
if [ -f .env.local ]; then
  echo -e "${GREEN}✓ .env.local exists${NC}"
  
  # Extract GA ID
  GA_ID=$(grep "VITE_GA_ID" .env.local | cut -d'=' -f2)
  GA_ENABLED=$(grep "VITE_ENABLE_ANALYTICS" .env.local | cut -d'=' -f2)
  
  if [ -n "$GA_ID" ] && [ "$GA_ID" != "" ]; then
    echo -e "${GREEN}✓ Google Analytics ID configured: $GA_ID${NC}"
  else
    echo -e "${YELLOW}⚠ Google Analytics ID not set in .env.local${NC}"
  fi
  
  if [ "$GA_ENABLED" = "true" ]; then
    echo -e "${GREEN}✓ Analytics enabled${NC}"
  else
    echo -e "${YELLOW}⚠ Analytics disabled (change VITE_ENABLE_ANALYTICS=true to enable)${NC}"
  fi
else
  echo -e "${RED}✗ .env.local not found${NC}"
  echo "   Run: cp .env.example .env.local"
fi

echo

# Check GA script in index.html
if grep -q "googletagmanager.com/gtag/js" index.html; then
  echo -e "${GREEN}✓ Google Analytics script in index.html${NC}"
else
  echo -e "${RED}✗ Google Analytics script not found in index.html${NC}"
fi

# Check AdSense script in index.html
if grep -q "pagead2.googlesyndication.com" index.html; then
  echo -e "${GREEN}✓ Google AdSense script in index.html${NC}"
else
  echo -e "${YELLOW}⚠ Google AdSense script not found${NC}"
fi

echo

# Check analytics utility exists
if [ -f "src/app/utils/analytics.ts" ]; then
  echo -e "${GREEN}✓ Analytics utility module exists${NC}"
else
  echo -e "${RED}✗ Analytics utility module not found${NC}"
fi

# Check AdSense component exists
if [ -f "src/app/components/AdSenseAd.tsx" ]; then
  echo -e "${GREEN}✓ AdSense component exists${NC}"
else
  echo -e "${RED}✗ AdSense component not found${NC}"
fi

echo

# Check documentation
if [ -f ".github/ANALYTICS.md" ]; then
  echo -e "${GREEN}✓ Analytics documentation exists${NC}"
else
  echo -e "${YELLOW}⚠ Analytics documentation not found${NC}"
fi

echo

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Verification Complete${NC}"
echo -e "${BLUE}================================================${NC}\n"

echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Update .env.local with your GA ID (if not done)"
echo "2. Review .github/ANALYTICS.md for integration details"
echo "3. Add tracking to pages: import { trackPageView } from '@/app/utils/analytics'"
echo "4. Add ads to pages: import AdSenseAd from '@/app/components/AdSenseAd'"
echo "5. Test locally: npm run dev"
echo "6. Verify events in Google Analytics dashboard"
echo

echo -e "${GREEN}✓ Setup verification complete!${NC}\n"
