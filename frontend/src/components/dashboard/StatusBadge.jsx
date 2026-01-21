import { CheckCircle, Clock, MessageCircle, UserCheck, XCircle, AlertCircle, UserPlus, Zap } from "lucide-react";

const statusConfig = {
  new: {
    label: "New",
    icon: UserPlus,
    colors: "bg-blue-100 text-blue-700"
  },
  contacted: {
    label: "Contacted",
    icon: MessageCircle,
    colors: "bg-purple-100 text-purple-700"
  },
  active: {
    label: "Active",
    icon: Zap,
    colors: "bg-emerald-100 text-emerald-700"
  },
  qualified: {
    label: "Qualified",
    icon: UserCheck,
    colors: "bg-green-100 text-green-700"
  },
  pending: {
    label: "Pending",
    icon: Clock,
    colors: "bg-yellow-100 text-yellow-700"
  },
  converted: {
    label: "Converted",
    icon: CheckCircle,
    colors: "bg-indigo-100 text-indigo-700"
  },
  closed: {
    label: "Closed",
    icon: XCircle,
    colors: "bg-gray-100 text-gray-700"
  },
  lost: {
    label: "Lost",
    icon: AlertCircle,
    colors: "bg-red-100 text-red-700"
  }
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    label: status,
    icon: AlertCircle,
    colors: "bg-gray-100 text-gray-700"
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.colors}`}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

export default StatusBadge;