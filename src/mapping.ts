import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  MigrationsAllowed,
  ReserveWithdrawal,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  TransfersStarted,
  TransfersStopped,
  VestingBalanceMigrated,
  VestingStartChanged
} from "../generated/Contract/Contract"
import { Base } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Base.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Base(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.MAX_VESTING_TOTAL_SUPPLY(...)
  // - contract.MINTER_ROLE(...)
  // - contract.RESERVE_FREEZE_DURATION(...)
  // - contract.RESERVE_FREEZE_DURATION_DAYS(...)
  // - contract.VESTING_DURATION(...)
  // - contract.VESTING_DURATION_DAYS(...)
  // - contract.allowMigrations(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.burn(...)
  // - contract.burnFrom(...)
  // - contract.changeVestingStart(...)
  // - contract.convertAmountUsingRatio(...)
  // - contract.convertAmountUsingReverseRatio(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.hasRole(...)
  // - contract.increaseAllowance(...)
  // - contract.isMigratingAllowed(...)
  // - contract.isTransferringStopped(...)
  // - contract.migrateVestingBalance(...)
  // - contract.mint(...)
  // - contract.mintWithoutVesting(...)
  // - contract.name(...)
  // - contract.reserveAmount(...)
  // - contract.reserveFrozenUntil(...)
  // - contract.spentVestedBalanceOf(...)
  // - contract.startTransfers(...)
  // - contract.stopTransfers(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.totalVestedBalanceOf(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.unspentVestedBalanceOf(...)
  // - contract.vestingDaysLeft(...)
  // - contract.vestingDaysSinceStart(...)
  // - contract.vestingEnd(...)
  // - contract.vestingStart(...)
  // - contract.withdrawReserve(...)
}

export function handleMigrationsAllowed(event: MigrationsAllowed): void {}

export function handleReserveWithdrawal(event: ReserveWithdrawal): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTransfer(event: Transfer): void {}

export function handleTransfersStarted(event: TransfersStarted): void {}

export function handleTransfersStopped(event: TransfersStopped): void {}

export function handleVestingBalanceMigrated(
  event: VestingBalanceMigrated
): void {}

export function handleVestingStartChanged(event: VestingStartChanged): void {}
