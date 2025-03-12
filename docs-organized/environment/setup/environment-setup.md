# Development Environment Setup Guide

## Environment Specifications

### Installation Details

- **Operating System**: Windows 11 ARM64
- **Shell**: PowerShell Core 7.4.6
- **Architecture**: ARM64
- **Installation Paths**:
  - Node.js: `C:\Program Files\nodejs`
  - Python: `C:\Users\chipp\AppData\Local\Programs\Python\Python312-arm64`
  - Git: `C:\Program Files\Git`
  - Docker: `C:\Program Files\Docker`
  - .NET: `C:\Program Files\dotnet`

### Installed Tools & Versions

| Tool         | Version        | Status | Architecture |
|--------------|---------------|---------|--------------|
| Node.js      | v22.14.0      | ✅ LTS  | ARM64        |
| npm          | v11.1.0       | ✅      | ARM64*       |
| Vercel CLI   | v41.1.0       | ✅      | ARM64*       |
| Python       | v3.12.8       | ✅      | ARM64        |
| Git          | v2.47.1       | ✅      | x64†         |
| Docker       | v27.3.1       | ✅      | ARM64        |
| .NET SDK     | v8.0.406      | ✅ LTS  | ARM64        |
| pnpm         | v9.15.3       | ✅      | ARM64*       |
| bun          | v1.1.27       | ✅      | x64†         |
| PowerShell   | v7.4.6        | ✅      | ARM64        |

\* Runs on Node.js, inherits ARM64 architecture  
† Runs via Windows x64 emulation layer

### Architecture Notes

#### Native ARM64 Applications

- Node.js, Python, Docker, .NET SDK, and PowerShell run natively on ARM64
- Node.js-based tools (npm, pnpm, Vercel CLI) inherit Node.js's ARM64 architecture

#### x64 Emulation

- Git runs via Windows' x64 emulation layer (standard for Windows ARM64)
- Bun currently uses x64 emulation (ARM64 Windows support in development)
- Windows 11 provides efficient x64 emulation with minimal performance impact

### System Configuration

#### Environment Variables

```powershell
# System PATH entries
C:\windows\system32
C:\windows
C:\windows\System32\Wbem
C:\windows\System32\OpenSSH\
C:\Program Files\nodejs
C:\Program Files\Git\cmd
C:\Program Files\PowerShell\7
C:\Program Files\Docker\Docker\resources\bin
C:\Program Files\GitHub CLI
C:\Program Files\dotnet

# User PATH entries
C:\Users\chipp\AppData\Roaming\npm
C:\Users\chipp\AppData\Local\Programs\Python\Python312-arm64
C:\Users\chipp\AppData\Local\Programs\Python\Python312-arm64\Scripts
C:\Users\chipp\AppData\Local\pnpm
C:\Users\chipp\.bun\bin
C:\Users\chipp\scoop\shims
```

## Verification Commands

### Core Tools

```powershell
# Node.js & npm
node --version    # v22.14.0
npm --version     # v11.1.0

# Python
python --version  # v3.12.8

# Git
git --version     # v2.47.1

# Docker
docker --version  # v27.3.1

# .NET
dotnet --version  # v8.0.406

# Package Managers
pnpm --version    # v9.15.3
bun --version     # v1.1.27
```

### Development Tools

```powershell
# Vercel CLI
vercel --version  # v41.1.0

# PowerShell
$PSVersionTable.PSVersion  # v7.4.6
```

## Common Operations

### Package Management

```powershell
# NPM Global Packages
npm install -g <package>

# PNPM Packages
pnpm add <package>

# Python Packages
python -m pip install <package>

# .NET Tools
dotnet tool install -g <package>
```

### Project Initialization

```powershell
# Create Next.js Project
npx create-next-app@latest my-app --typescript --tailwind --app

# Create Python Virtual Environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Initialize Git Repository
git init
```

## Best Practices

### Architecture-Specific Considerations

1. Use native ARM64 builds when available
2. Monitor memory usage and performance
3. Use architecture-specific package versions
4. Leverage Windows 11 ARM optimizations

### Development Workflow

1. Use PowerShell Core for all terminal operations
2. Maintain consistent Node.js LTS versions
3. Keep development tools updated
4. Use version control for all projects

## Troubleshooting

### Common Issues

1. PATH Issues:

   ```powershell
   # Verify PATH
   $env:Path -split ';'
   ```

2. Permission Issues:

   ```powershell
   # Run as Administrator
   Start-Process powershell -Verb RunAs
   ```

### Support Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Python Documentation](https://docs.python.org)
- [Git Documentation](https://git-scm.com/doc)
- [Docker Documentation](https://docs.docker.com)
- [.NET Documentation](https://docs.microsoft.com/dotnet)

---
Last Updated: February 12, 2024
Environment Documentation Version: 1.0
