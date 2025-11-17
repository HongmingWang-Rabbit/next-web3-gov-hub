import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminWallet = '0x1234567890123456789012345678901234567890'; // Replace with your wallet address
  const admin = await prisma.user.upsert({
    where: { walletAddress: adminWallet },
    update: { isAdmin: true },
    create: {
      walletAddress: adminWallet,
      isAdmin: true,
    },
  });

  console.log('✅ Admin user created:', admin.walletAddress);

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12' },
    update: {},
    create: {
      walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      isAdmin: false,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { walletAddress: '0x9876543210987654321098765432109876543210' },
    update: {},
    create: {
      walletAddress: '0x9876543210987654321098765432109876543210',
      isAdmin: false,
    },
  });

  console.log('✅ Sample users created');

  // Create sample blog posts
  const post1 = await prisma.post.upsert({
    where: { slug: 'welcome-to-web3-gov-hub' },
    update: {},
    create: {
      title: 'Welcome to Web3 Gov Hub',
      slug: 'welcome-to-web3-gov-hub',
      coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      content: `# Welcome to Web3 Gov Hub

We're excited to introduce **Web3 Gov Hub**, a decentralized governance and blogging platform that combines the power of Web3 with community-driven content.

## What Makes Us Different?

- **Wallet-Based Authentication**: No passwords, just your Web3 wallet
- **Community Voting**: Upvote and downvote posts and comments
- **Transparent Governance**: All interactions are tied to wallet addresses
- **Markdown Support**: Write rich content with full markdown support

## Getting Started

1. Connect your Web3 wallet
2. Sign in with your wallet
3. Start exploring, voting, and commenting!

We can't wait to see what discussions emerge from our community!`,
      authorId: admin.id,
      published: true,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { slug: 'understanding-web3-governance' },
    update: {},
    create: {
      title: 'Understanding Web3 Governance',
      slug: 'understanding-web3-governance',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      content: `# Understanding Web3 Governance

Web3 governance represents a fundamental shift in how we organize and make decisions in decentralized systems.

## Key Principles

### Transparency
All governance actions are visible on-chain, creating accountability and trust.

### Community Participation
Token holders and community members can participate in decision-making processes.

### Decentralization
No single entity controls the platform - power is distributed among participants.

## Voting Mechanisms

Different platforms use various voting mechanisms:

- **Token-weighted voting**: Your vote power is proportional to your token holdings
- **Quadratic voting**: Reduces the influence of large holders
- **Conviction voting**: Time commitment increases voting power

## The Future

Web3 governance is still evolving, and platforms like this one are experiments in finding better ways to coordinate and make collective decisions.`,
      authorId: admin.id,
      published: true,
    },
  });

  const post3 = await prisma.post.upsert({
    where: { slug: 'building-on-ethereum' },
    update: {},
    create: {
      title: 'Building on Ethereum: A Developer\'s Journey',
      slug: 'building-on-ethereum',
      coverImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
      content: `# Building on Ethereum: A Developer's Journey

Starting with Ethereum development can be overwhelming, but it's an incredibly rewarding experience.

## Essential Tools

### Development Frameworks
- **Hardhat**: The most popular development environment
- **Foundry**: Fast, modern, and written in Rust
- **Truffle**: The OG framework, still widely used

### Libraries
- **ethers.js**: Comprehensive Ethereum library
- **wagmi**: React Hooks for Ethereum
- **viem**: Type-safe, modular Ethereum library

## Smart Contract Development

Writing smart contracts requires careful consideration of:

1. **Gas optimization**: Every operation costs gas
2. **Security**: Exploits can drain funds instantly
3. **Upgradability**: Planning for future improvements
4. **Testing**: Comprehensive test coverage is essential

## Frontend Integration

Modern Web3 apps use:
- **Next.js** for the framework
- **wagmi** for blockchain interactions
- **ConnectKit** or **RainbowKit** for wallet connections

Happy building! 🛠️`,
      authorId: admin.id,
      published: true,
    },
  });

  console.log('✅ Sample blog posts created');

  // Create sample comments
  const comment1 = await prisma.comment.create({
    data: {
      text: 'This is an excellent introduction! Looking forward to participating in this community.',
      postId: post1.id,
      userId: user1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      text: 'Great breakdown of Web3 governance principles. The transparency aspect is especially important.',
      postId: post2.id,
      userId: user2.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      text: 'Thanks for this guide! Hardhat has been my go-to for development.',
      postId: post3.id,
      userId: user1.id,
    },
  });

  console.log('✅ Sample comments created');

  // Create sample votes
  await prisma.vote.createMany({
    data: [
      // Post votes
      { userId: user1.id, targetType: 'post', targetId: post1.id, value: 1 },
      { userId: user2.id, targetType: 'post', targetId: post1.id, value: 1 },
      { userId: user1.id, targetType: 'post', targetId: post2.id, value: 1 },
      { userId: user2.id, targetType: 'post', targetId: post3.id, value: 1 },
      // Comment votes
      { userId: admin.id, targetType: 'comment', targetId: comment1.id, value: 1 },
      { userId: admin.id, targetType: 'comment', targetId: comment2.id, value: 1 },
      { userId: user2.id, targetType: 'comment', targetId: comment3.id, value: 1 },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Sample votes created');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
