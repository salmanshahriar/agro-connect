import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FarmerEarnings() {
  const earningsData = {
    thisMonth: 12500,
    lastMonth: 10400,
    thisYear: 45250,
    pending: 3500,
  }

  const transactions = [
    {
      id: "TXN-001",
      order: "ORD-003",
      amount: 1800,
      date: "2025-01-14",
      status: "completed",
    },
    {
      id: "TXN-002",
      order: "ORD-005",
      amount: 2200,
      date: "2025-01-13",
      status: "completed",
    },
    {
      id: "TXN-003",
      order: "ORD-007",
      amount: 3100,
      date: "2025-01-12",
      status: "completed",
    },
    {
      id: "TXN-004",
      order: "ORD-002",
      amount: 3000,
      date: "2025-01-11",
      status: "pending",
    },
    {
      id: "TXN-005",
      order: "ORD-001",
      amount: 2500,
      date: "2025-01-10",
      status: "pending",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Earnings</h1>
          <p className="text-muted-foreground">
            Track your income and transactions
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0 bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{earningsData.thisMonth.toLocaleString()}
            </div>
            <p className="text-xs text-primary mt-1">
              +
              {(
                ((earningsData.thisMonth - earningsData.lastMonth) /
                  earningsData.lastMonth) *
                100
              ).toFixed(1)}
              % from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{earningsData.lastMonth.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Year
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{earningsData.thisYear.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total earnings in 2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{earningsData.pending.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{txn.id}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        txn.status === "completed"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Order: {txn.order}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-lg">
                    ৳{txn.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
