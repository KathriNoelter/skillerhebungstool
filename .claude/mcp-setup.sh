#!/bin/bash
# ==============================================================
# MCP Server Setup
# ==============================================================
# Run the commands below to connect external tools to Claude.
# Each server gives Claude access to new tools via the
# Model Context Protocol (open standard).
#
# Only enable the servers you actually use.
# ==============================================================

# --- GitHub: PRs, issues, repos ---
# claude mcp add github -- npx -y @modelcontextprotocol/server-github

# --- PostgreSQL: Direct database queries ---
# claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres "postgresql://user:pass@localhost:5432/mydb"

# --- Sentry: Error monitoring ---
# claude mcp add sentry -- npx -y @modelcontextprotocol/server-sentry --auth-token YOUR_TOKEN

# --- Slack: Team messaging ---
# claude mcp add slack -- npx -y @modelcontextprotocol/server-slack

# --- Filesystem: Controlled file access for MCP-aware tools ---
# claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir

# --- Figma: Design file access ---
# claude mcp add figma -- npx -y @anthropic/mcp-server-figma --token YOUR_TOKEN

# ==============================================================
# Usage:
#   1. Uncomment the servers you need
#   2. Replace placeholder credentials
#   3. Run: bash .claude/mcp-setup.sh
#   4. MCP tools appear alongside Claude's built-in tools
#
# List connected servers: claude mcp list
# Remove a server:       claude mcp remove <name>
# ==============================================================

echo "Uncomment the MCP servers you want to enable, then re-run this script."
