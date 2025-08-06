# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important User Requirements

**항상 한글로 말할 것.**

**이 프로젝트는 Camera Work Auto Report 시스템입니다. Firebase와 GitHub 데이터를 기반으로 카메라 파트 업무 보고서를 자동 생성합니다.**

When the user requests changes or modifications:
1. First update relevant MD files within the project to reflect the changes
2. Redesign the entire project plan according to the changes
3. Then execute the requirements

Always communicate in Korean with the user.

## Project Overview

This is the Camera Work Auto Report system that:
- Fetches camera work tasks from Firebase Firestore
- Tracks GitHub activities (issues, commits, PRs)
- Analyzes priorities using Gemini AI
- Automatically writes reports to Google Docs
- Runs daily at 10 AM KST via GitHub Actions

## Key Components

1. **FirebaseDataFetcher**: Collects camera tasks assigned to Aiden Kim
2. **GitHubDataFetcher**: Monitors camera-related GitHub activities
3. **GeminiAnalyzer**: AI-powered priority analysis
4. **GoogleDocsWriter**: Automated report writing
5. **ReportGenerator**: Orchestrates the entire process

## Testing Approach

**중요**: 항상 실행 테스트를 진행할 때에는 실제로 실행하여 결과물까지 정확하게 확인할 수 있는 방법을 찾아, 사용자가 요구하는 결과물과 일치하는지 확인하고, 그렇지 않으면 문제를 추론하여 해결한 후 이를 해결할 때까지 반복하여 해결한 뒤에 보고합니다.

### Testing Strategy
1. **Always run actual tests** - Don't assume code works, verify it
2. **Check output matches requirements** - Ensure results align with user expectations
3. **Debug until resolution** - If issues arise, debug iteratively until fixed
4. **Report only after verification** - Only report completion after confirming functionality

### Test Commands
- `npm test` - Run system test
- `npm run test:firebase` - Test Firebase connection
- `npm run test:docs` - Test Google Docs writing
- `node test-run.js` - Comprehensive system test

## Security Notes

- Never expose API keys in code
- Use GitHub Secrets for sensitive data
- Firebase config in src/config/index.ts should be reviewed
- Service account keys must be kept secure

## Performance Optimization

- Singleton pattern for Firebase connection
- 5-minute cache for task data
- Parallel data fetching from Firebase and GitHub
- 10-minute timeout for GitHub Actions