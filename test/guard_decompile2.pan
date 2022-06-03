# syntax: https://eveem.org/tutorial/

# Palkeoramix decompiler.

def storage:
  complete is uint8 at storage 0

def complete(): # not payable
  return bool(complete)

#
#  Regular functions
#

def _fallback() payable: # default function
  revert

def unknownff4ab96b(addr _param1) payable:
  require call.value >= 6734 * 10^10 * 3600
  if caller == _param1:
      call _param1 with:
         value 42 wei
           gas 0 wei
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]

def unknown774c0207(uint256 _param1) payable:
  require call.value >= 6179 * 10^10 * 3600
  if _param1 <= 87878787:
      if _param1 >= 78787878:
          call caller with:
             value 24 wei
               gas 0 wei
          if not ext_call.success:
              revert with ext_call.return_data[0 len return_data.size]

def unknownf00b8676(uint256 _param1) payable:
  require call.value >= 117845 * 10^9 * 3600
  s = 0
  idx = 28
  while idx < 32:
      require uint8((Mask(8, -(('mask_shl', 256, 0, -3, ('param', '_param1')), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('param', '_param1')), 0) - 256) - 48) <= 10
      require uint8((Mask(8, -(('mask_shl', 256, 0, -3, ('param', '_param1')), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('param', '_param1')), 0) - 256) - 48) >= 0
      s = (Mask(8, -(('mask_shl', 256, 0, -3, ('param', '_param1')), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('param', '_param1')), 0) - 256) - 48
      idx = idx + 1
      continue
  s = 0
  s = 0
  idx = 28
  while idx < 32:
      s = ((Mask(8, -(('mask_shl', 256, 0, -3, ('param', '_param1')), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('param', '_param1')), 0) - 256) - 48)^4
      s = s + ((Mask(8, -(('mask_shl', 256, 0, -3, ('param', '_param1')), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('param', '_param1')), 0) - 256) - 48)^4
      idx = idx + 1
      continue
  idx = 0
  while idx < 28:
      require Mask(8, -(('mask_shl', 256, 0, -3, ('param', '_param1')), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('param', '_param1')), 0) - 8 == Mask(8, -(('mask_shl', 256, 0, -3, ('sha3', ('mask_shl', 160, 96, -96, ('data', ('mask_shl', 64, 0, 0, 'caller'), 0, 0)))), 0) + 256, idx) << (('mask_shl', 256, 0, -3, ('sha3', ('mask_shl', 160, 96, -96, ('data', ('mask_shl', 64, 0, 0, 'caller'), 0, 0)))), 0) - 8
      idx = idx + 1
      continue
  if var10004 == s << 160:
      complete = 1
